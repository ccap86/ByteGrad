const text = 'Hello World!  ';

// STRINGS!!!!!!!!! /////////

// length (number of characters)
// console.log(text.length);

// // includes()
// console.log(text.includes('!'));

// // toUppercase
// console.log(text.toUpperCase(text));

// // trim() removes the whitespace
// console.log(text);
// console.log(text.trim());

// // substring()
// console.log(text.substring(0,3));

// // chaining
// const result = text
// .toUpperCase()
// .trim()
// .substring(1);

// console.log(result);

// // NUMBERS!!!!!!!!!!!!!! //////////////
// const total = 1543.55345; // five decimals after decimal point

// // toFixed() -- 0
// console.log(total.toFixed());

// toFixed() -- 1


//////////////////////////////
// BOOLEANS 
/////////////////

// const text2 = 'Map of NYC';
//     if (text2.includes('NYC')) {
//         console.log(100);
//     }
//     else {
//         console.log(false);
//     }


//     // when dealing with a server
//     const response = {
//     statusCode: 500,
//     ok: false,
//     data: [1, 2, 3]    
//     };

//     if (!response.ok) {
//       console.log('deal with error');   
//     }

/////////////////////////////////////
// ARRAYS 

const numbers = [99, 5, 8, 16];

// Length (number of elements of array)
console.log(numbers.length);

// push to add to the array
numbers.push(100);
console.log(numbers);

// includes() to check if a value is contained within
console.log(numbers.includes(5));

// numbers[0] = numbers[0] * 2;
// numbers[0] = numbers[1] * 2;
// numbers[0] = numbers[2] * 2;
// numbers[0] = numbers[3] * 2;
// numbers[0] = numbers[4] * 2;

// an easier way to do this
numbers.forEach( number => console.log(number * 2));

// Objects in arrays

const data = [ 
    {
       name: 'John',
       age: 45 
    },
    {
        name: 'Jane',
        age: 43
    },
    {
        name: 'Joyce',
        age: 20
    }
];

data.forEach( function(name, age) {
    console.log(name);
    console.log(age);
});

console.log(data[2].age);



// object in object
const user = 
    {
        name: 'Alice',
        age: 34,
        hobbies: ['knitting', 'programming'],
        address: 
        {
            city: 'Scranton',
            state: 'New  York'
        }

    };

    console.log(user.address.city);
    console.log(user.address[0]) // doesn't work
// property name is sometimes same as property value
// const username = input.value;

// const newUser = {
//     username: '',
//     password:''
// };


// passing object as argument to function
const logUser = (user) => {
    console.log(user.name);
    console.log(user.age);
    console.log(user.address);
};

const user2 = {
    name: 'Emily',
    age: 22,
    address: {
        city: 'Harker',
        State: 'TX'
    }
};

logUser(user2);


//////////////////////////////////////////////
// iNCREMENT (++) & dECREMENT (--)

let num = 100;
console.log(num);

////////////////////////////
// FUNCTIONS
// const addNumbers =  () => {
//     let result = num + 100;
//     console.log(result);
// }

// addNumbers();
// OVERVIEW AGAIN


// CALLING OTHER FUNCTIONS IN FUNCTION BODY
const logHello = () => {
    console.log('hello');
}

const addNumbers =  () => {
    let result = num + 100;
    console.log(result);
    logHello();
}


addNumbers();

logHello();

// REFACTORING
// see oneNote

// early return / stop function execution
// see oneNote

//////////////////////////////
// Hosting

// Video 23 - Timers (SetTimeout & SetInterval)
//

// setTimeout( function() {
//     console.log('Hello');
//     console.log('Hi');
// }, 2000);
// 1 sec = 1000

// setInterval (() => {
//     console.log('Hello');
//     console.log('Hi');
// }, 2000);


// setTimeout( () => {
//     console.log('Hello');
//     console.log('Hi');
// }, 2000);


/////////////////
// Video 24 - Loops (ForEach & For)

const Numbers = [5, 10, 15];

// ForEach()
// Numbers.forEach( function(number) {
//     console.log(number + 1);
// });


// for


/////////////////////////////////
// Fetch api

// fetch('https://jsonplaceholder.typicode.com/todos')
//     .then( res => {
//         if(!res.ok) {
//             console.log('problem');
//         }
//         return res.json();
// })
// .then(data => {
//     console.log(data[0].title);
// }).catch(error => {
//     console.log('ERROR: ' + error);
// });


////////////////////////////
// Video 27 Fetch API Quick Summary

// const newUser = {
//     name: 'Serena',
//     job: 'Singer'
// };


// fetch('https://reqres.in/api/users', { 
//     method: 'POST',
//     headers: {
//         'content-type': 'application/json' 
//         },
//         body: JSON.stringify(newUser),
//     })
//     .then( res =>  {
//         if (!res.ok) {
//             console.log('problem');
//             return;
//         }

//         return res.json();
//     })
//     .then(data => {
//         console.log('success!');
//     })
//     .catch(error => {
//         console.log(error);
//     });
 




//////////////////////////
//Intermediate DOM #1:
//Manipulating The DOM

//document.querySelector('.btn').disabled = true;
// const buttonEl = document.querySelector('.btn');
// const inputEl = document.querySelector('.input');
// const headingEl = document.querySelector('.heading');

// const number = 10;
// const user3 = {
//     name: 'chris',
//     city: 'harker'
// };



// inputEl.value = 'blabla';
// headingEl.textContent = "God is <span>Great!</span>";
// headingEl.innerHTML = "God is <span>Great!</span>";
// headingEl.insertAdjacentHTML('beforebegin', "God is <span>Great!</span>");


// headingEl.innerHTML = `God is <span>Great!</span>
//  and is our help
//  in troubled timed!  ${user3.name}`;


// buttonEl.disabled = true;
//buttonEl.blur();

const containerEl = document.querySelector('.container');

containerEl.addEventListener('click', function(event) {
    console.log(event);
});

// Get today's featured article from English Wikipedia

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2,'0');
let day = String(today.getDate()).padStart(2,'0');
let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;


fetch( url,
    {
        headers: {
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3YmQzYjJiMjIxNjAyNjk0OGFjZmFhZjEzNWI5ZjUwMCIsImp0aSI6Ijk2NzIwMjQzZWUwNmE0MzZmNWQ3NWY1ZjQ3ZWU2NmZiMjcyYjQ5MzQ3NTMzNzczZDdjM2E3YTgwNGMzNzdlZjdhZjdhNTZlMmYxMDgwNDRmIiwiaWF0IjoxNjk4NTg0NDgxLjc4NTE5NywibmJmIjoxNjk4NTg0NDgxLjc4NTIsImV4cCI6MzMyNTU0OTMyODEuNzgzMDI0LCJzdWIiOiI3NDExOTk1NCIsImlzcyI6Imh0dHBzOi8vbWV0YS53aWtpbWVkaWEub3JnIiwicmF0ZWxpbWl0Ijp7InJlcXVlc3RzX3Blcl91bml0Ijo1MDAwLCJ1bml0IjoiSE9VUiJ9LCJzY29wZXMiOlsiYmFzaWMiXX0.jK3b1Y6D7kxxDrFu8WvJaQB1ME4EmOlllBV-Nh68AKHotiKVNHB62JWO5b9IUJwK4-gDufmHBvwKEoIOG1r4aHJrc6Y4-R4VRPLyX3bDNGwCnLevAl0v9Eznv5vvDeLQCPOwcp62TAuftYl-9eMYbmNlIWEGEPRhEUCvPqmyntKkPdqib9MSDGiEnD6R5VOvURsWeAvC0WJN0dIjrm9-i5Dp_WrAU_dLiQ-765yymr1I0MyO_0mswaGjTcwMlo5mTEnLYBoFmVTV0d3cp6MEkS8UyU_uWws77RKBgxdAvtlPeRWCpUpW-WQVVOksGBZC7X0HTl-vpNr1LRvOOzGDNkKLwagGR19rQkULMHW6COAH0Mjca7xa9SpMbA0oMFxAQOGryM_jUYSxAbiWdM-w1GQ-jehasw84uW7MFeuiGqolFHZpzRqrsfbjXb2oIveD0xx3N570LwJTFzvSa9a7dJWTeqKxVIPhCSiB2hzG7DoTG4SQRSe3BdpVa2PktZRQbszOt5qbY-joSgusTAdfq4Hw0JTxyuw9SU5N4wbBlsOPnOIA_fit2-MWIUHhld_RmvIbOEaZh7snrVu_pZxqI2ZRCliiq5OV71OHrP6bCOzh0loIaahvREDXz8jLADLJg7nfKN3kCmfwcBwvqCHRTkqZ7jw7MnpVwUL8Zbxigcs',
            'Api-User-Agent': 'clcapella86@gmail.com'
        }
    }
)
.then( res => { 
    return res.json();
})
.then( data => {
    const markHeading = `<ul>${today}</ul>`;    
    document.querySelector('.heading').insertAdjacentHTML("afterend", markHeading);
    for (let i = 0; i < 5; i++){
        const mark = `<ul>${data['news'][i]['story']}</ul>`;
        
        document.querySelector('ul').insertAdjacentHTML("afterend", mark);

    }
})
.then(console.log).catch(console.error);