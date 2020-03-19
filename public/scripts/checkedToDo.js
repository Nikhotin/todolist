function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject(xhr.response);
    };

    xhr.send(JSON.stringify(body));
  });
}

const list = document.querySelectorAll('ul');
for (let i = 0; i < list.length; i += 1) {
  list[i].addEventListener('click', async (ev) => {
    if (ev.target.tagName === 'LI') {
      const title = ev.target.textContent.slice(0, -1);
      const body = { title };
      await sendRequest('PUT', 'http://localhost:3000/todos', body);
    }
    // очистка блоков для дальнейшего заполнения из БД
    const arr1 = document.getElementsByClassName('unchecked');
    while (arr1.length > 0) {
      arr1[0].remove();
    }
    const arr2 = document.getElementsByClassName('checked');
    while (arr2.length > 0) {
      arr2[0].remove();
    }
    // заполнение блоков данными из БД
    await sendRequest('GET', 'http://localhost:3000/todos')
      .then((data) => {
        // eslint-disable-next-line no-shadow
        for (let i = 0; i < data.length; i += 1) {
          const li = document.createElement('li');
          const text = document.createTextNode(data[i].title);
          li.appendChild(text);
          if (data[i].checked === false) {
            document.getElementById('todos').appendChild(li);
            const span = document.createElement('SPAN');
            const txt = document.createTextNode('=');
            span.className = 'dragAndDrop';
            span.appendChild(txt);
            li.appendChild(span);
            li.classList.toggle('unchecked');
          } else {
            document.getElementById('check').appendChild(li);
            const span = document.createElement('SPAN');
            const txt = document.createTextNode('=');
            span.className = 'dragAndDrop';
            span.appendChild(txt);
            li.appendChild(span);
            li.classList.toggle('checked');
          }
        }
      })
      .catch((err) => console.log(err));
  }, false);
}
