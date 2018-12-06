const body = document.body;
// create closure over global id, maybe can wrap in giant function to hide
let id = 1;
// hold daycares so can add children to specific ID; trade space for speed
const daycares = {};

class Daycare {
    constructor(name, status, workers) {
        this.name = name;
        this.status = status;
        this.workers = workers;
        this.id = id++;
        this.children = [];
    }

    deleteChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
    }

    addChild(child) {
        this.children.push(child);
    }
// maybe when bored
//     setName(name) {
//         this.name = name;
//     }

//     setWorkers(num) {
//         this.workers = num;
//     }

//     setStatus(status) {
//         this.setStatus = status;
//     }
}

class Child {
    constructor(name, age, hometown) {
        this.name = name;
        this.age = age;
        this.hometown = hometown;
    }
}

const inputName = document.getElementById('input-name'),
inputStatus = document.getElementById('input-status'),
inputWorkers = document.getElementById('input-workers');

let init = function init() {
    // function in charge of creating new daycares
    if (inputStatus.value.toLowerCase() === 'clean' || inputStatus.value.toLowerCase() === 'not clean') {}
    else return alert('You must enter Clean or Not Clean for cleanliness value');
    if (Number.isNaN(Number(inputWorkers.value)) || inputWorkers.value.length === 0) return alert('Number of workers must be a number');

    let parentDiv = document.createElement('div');
    parentDiv.classList.add('parentDiv');

    const dayCareDiv = document.createElement('div');
    dayCareDiv.classList.add('container');

    const daycare = new Daycare(inputName.value, inputStatus.value.toUpperCase(), Number(inputWorkers.value));
    daycares[daycare.id] = daycare;

    const name = document.createElement('h1');
    name.textContent = `${inputName.value} (ID: ${daycare.id})`;
    dayCareDiv.appendChild(name);

    const childrenList = document.createElement('ul');
    childrenList.setAttribute('id', `childrenList${daycare.id}`)
    childrenList.classList.add('hidden');
    childrenList.classList.add('children-list');

    const showChildren = document.createElement('button');
    showChildren.textContent = 'Show Children';
    showChildren.classList.add('show-children');
    showChildren.addEventListener('click', e => {
        if ([...childrenList.classList].includes('hidden')) {
            childrenList.classList.remove('hidden');
            showChildren.textContent = 'Hide Children';
        } else {
            childrenList.classList.add('hidden');
            showChildren.textContent = 'Show Children';
        }
    });

    const status = document.createElement('p');
    status.textContent = `Status: ${inputStatus.value.toUpperCase()}`;

    const numOfWorkers = document.createElement('p');
    numOfWorkers.textContent = `Number of Workers: ${inputWorkers.value}`;

    parentDiv.appendChild(dayCareDiv);

    // append daycarediv stuff
    dayCareDiv.append(name, showChildren, childrenList, status, numOfWorkers);
    // dayCareDiv.appendChild(name);
    // dayCareDiv.appendChild(showChildren);
    // dayCareDiv.appendChild(childrenList);
    // dayCareDiv.appendChild(status);
    // dayCareDiv.appendChild(numOfWorkers);

    body.insertBefore(parentDiv, document.getElementById('forms').nextSibling);

    // clear values
    inputName.value = '';
    inputStatus.value = '';
    inputWorkers.value = '';
}

document.getElementById('add-daycare').addEventListener('click', e => init());

// below this line is child form stuffs
const childName = document.getElementById('child-name'),
      childAge = document.getElementById('child-age'),
      childHometown = document.getElementById('child-hometown'),
      childDaycareId = document.getElementById('child-daycare-id');


let addChildMethod = function() {
    if (!childName.value.length || !childAge.value.length || !childHometown.value.length || !childDaycareId.value.length) return alert('All fields must contain a valid value');
    if (Number.isNaN(Number(childAge.value))) return alert('Age must be a number');
    if (childName.value.match(/\d/)) return alert('Names cannot contain numbers')
    const child = new Child(childName.value, Number(childAge.value), childHometown.value);

    const daycare = daycares[childDaycareId.value];

    if (!daycare) {
        return alert('There is no daycare with that ID. Please check again.')
    }
    daycare.addChild(child);
    
    const childToAdd = document.createElement('li'),
          childToDelete = document.createElement('button');
    childToAdd.textContent = `Name: ${child.name.toUpperCase()}, Age: ${child.age}, Hometown: ${child.hometown.toUpperCase()}`;
    childToAdd.appendChild(childToDelete);
    // the code below doesnt work with removing elts
    //childrenList = document.getElementById(`childrenList${daycare.id}`);
    childToDelete.textContent = 'X';
    childToDelete.classList.add('delete-button');
    document.getElementById(`childrenList${daycare.id}`).appendChild(childToAdd);
    childToDelete.addEventListener('click', e => {
        document.getElementById(`childrenList${daycare.id}`).removeChild(childToAdd);
        daycare.deleteChild(child);
    })

    // clear values
    childName.value = '';
    childAge.value = '';
    childHometown.value = '';
    childDaycareId.value = '';
}
document.getElementById('add-child').addEventListener('click', e => addChildMethod());