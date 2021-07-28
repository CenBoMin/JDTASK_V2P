function layOutCookie(oldCks, reg) {
  let result = 0;
  try {
    let keepIdx = [],
      removeIdx = [];
    for (let i = 0, len = oldCks.length; i < len; i++) {
      let oldId = ((oldCks[i] || '').match(reg) || ['', ''])[1];
      if (!oldId || keepIdx.includes(oldId)) {
        // 数据无效或账号已存在，需移除
        removeIdx.push(i);
      } else {
        keepIdx.push(oldId);
      }
    }
    for (let i = oldCks.length - 1; i >= 0; i--) {
      if (removeIdx.includes(i)) {
        oldCks.splice(i, 1);
        result = 1;
      }
    }
  } catch (e) {
    result = -1;
    $.logErr(e);
  }
  return result;
}
