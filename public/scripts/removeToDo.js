function removeElements() {
  const list = document.getElementsByClassName('checked');
  while (list.length > 0) {
    list[0].remove();
  }
}
