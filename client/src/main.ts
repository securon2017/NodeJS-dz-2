const axios = require('axios').default;
import { environment } from '../environment/environment';

interface Task {
    id?: number;
    title: string;
    text: string;
    createdDate: Date;
}

const refreshBtn = document.querySelector('.loadBtn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', getAllTasks);
}


const removeBtn = document.querySelector('.remove__list');
removeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    let item = e.target as any;
    console.log(item.id);
    axios.delete(environment.API_URL + `/${item.id}`);
    setTimeout(getAllTasks, 1000);
});

const addNewTaskBtn = document.querySelector('.new__task');
addNewTaskBtn.addEventListener('submit', function (e) {
    e.preventDefault();
    let item = e.target as any;
    console.log(item[0].value, item[1].value, item[2].value);
    axios({
        method: 'post',
        url: environment.API_URL,
        data: {
            title: `${item[0].value}`,
            text: `${item[1].value}`,
            createdDate: `${item[2].value}`
        }
    })
    setTimeout(getAllTasks, 1000);
});

function getAllTasks() {
    const list = document.querySelector('.task__list');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    const remove = document.querySelector('.remove__list');
    while (remove.firstChild) {
        remove.removeChild(remove.firstChild);
    }
    axios.get(environment.API_URL).then((res: any) => {
        console.log(res);
        const tasks = res.data as Task[];
        for (let i = 0; i < tasks.length; i++) {
            let li = document.createElement('li');
            li.innerText = `Title: ${tasks[i].title}; ${tasks[i].text}`;
            li.setAttribute('id', `${i}`);
            li.setAttribute('class', 'task__item');
            list.appendChild(li);
            if(i%2==0){
                li.style.backgroundColor='#dee3e0';
            }

            let remLi = document.createElement('li');
            // remLi.setAttribute();
            remLi.setAttribute('class', 'remove__item');
            let basket = document.createElement('a');
            let iconRemove = document.createElement('img');
            iconRemove.setAttribute('src', 'icons/basket.png');
            iconRemove.setAttribute('id', `${tasks[i].id}`);
            iconRemove.setAttribute('class', 'remove__icon');
            basket.appendChild(iconRemove);
            remLi.appendChild(basket);
            remove.appendChild(remLi);
        }

    });
}



// const deleteTask = function (event:Event) {
//     let deletedId = event.currentTarget.

//     axios.delete(environment.API_URL)
// }




