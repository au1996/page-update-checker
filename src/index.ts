/**
 * 页面更新检测器
 * @param {Object} option
 * @param {Number} option.duration 检测间隔时间 默认10s
 * @param {String} option.path 页面路径 默认为根路径 /
 * @param {RegExp} option.scriptReg script标签正则
 * @param {Boolean} option.test 是否开启测试模式
 * @param {Function} option.on 页面更新时的回调
 */

class PageUpdateChecker {
  duration: number
  path: string
  scriptReg: RegExp
  lastScripts: string[]
  test: boolean
  on: () => void

  constructor() {
    this.duration = 1000 * 10
    this.path = '/'
    this.scriptReg = /<script.*src="([^"]+)"/gm
    this.lastScripts = []
    this.test = false
    this.on = () => {
      if (typeof window === 'undefined' || !window.confirm) {
        console.log('页面已更新')
        return
      }
      const isOk = window.confirm('页面已更新，是否刷新？')
      if (!isOk) return
      location.reload()
    }
  }

  init(option: {
    duration?: number
    path?: string
    scriptReg?: RegExp
    test?: boolean
    on?: () => void
  }) {
    try {
      if (option.duration) this.duration = option.duration
      if (option.path) this.path = option.path
      if (option.scriptReg) this.scriptReg = option.scriptReg
      if (option.test) this.test = option.test
      if (option.on) this.on = option.on
      this.autoRefresh()
    } catch (error) {
      console.error(error)
    }
  }

  autoRefresh() {
    setTimeout(async () => {
      const willUpdate = await this.needUpdate()
      if (willUpdate || this.test) {
        this.on()
      }

      this.autoRefresh()
    }, this.duration)
  }

  async needUpdate() {
    const newScripts = await this.extractNewScripts()

    if (!this.lastScripts.length) {
      this.lastScripts = newScripts
      return false
    }

    if (this.lastScripts.length !== newScripts.length) {
      this.lastScripts = newScripts
      return true
    }

    for (let i = 0; i < this.lastScripts.length; i++) {
      if (this.lastScripts[i] !== newScripts[i]) {
        this.lastScripts = newScripts
        return true
      }
    }

    return false
  }

  async extractNewScripts() {
    const res = await fetch(`${this.path}?t=${Date.now()}`)
    const html = await res.text()
    let result: string[] = []
    let match = null

    this.scriptReg.lastIndex = 0
    while ((match = this.scriptReg.exec(html)) !== null) {
      result.push(match[1])
    }
    return result
  }
}

if (typeof window !== 'undefined') {
  ;(window as any).PageUpdateChecker = PageUpdateChecker
}

export default PageUpdateChecker
