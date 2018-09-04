function authorityFun() {
  const buttons = document.querySelectorAll('button[cId]')
  // TODO: 从STORAGE 里面获取functions
  const testFuns = ['module_add']
  if (buttons && buttons.length) {
    buttons.forEach(b => {
      const tempCid = b.getAttribute('cId')
      if (!testFuns.includes(tempCid)) {
        b.classList.add('is-disabled')
        b.setAttribute('disabled', true)
        b.setAttribute('title', '未获取到权限')
      } else {
        b.removeAttribute('disabled')
        b.removeAttribute('title')
        b.classList.remove('is-disabled')
      }
    })
  }
}
export default {
  mounted() {
    authorityFun()
  },
  activated() {
    authorityFun()
  }
}
