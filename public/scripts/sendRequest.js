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

sendRequest('GET', 'http://localhost:3000/todos')
  .then((data) => {
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
