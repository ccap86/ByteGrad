// // const description = "we need a floor";
// // const squareMeters = 100;
// // const specialCoating = true;
// // const floorOptions = ["carpet", "hardwood", "titles"];

// // const renovationJob = {
// //   ownerName: "John",
// //   maximumPrice: 5000,
// //   category: "bathroom",
// //   newShower: true,
// // };

// // // using var and let
// // if (false) {
// //   var hello = 5;
// //   console.log("in hello block");
// // } else {
// //   var hi = 10;
// //   console.log("in hi block");
// //   console.log(hello);
// // }
// // console.log(hello);
// // console.log(hi);

// // function test() {
// //   let a = 1;
// //   var b = 2;
// //   console.log("log a local: " + a);
// //   console.log("log b local: " + b);
// // }

// // test();
// // console.log("log a global: " + a);
// // console.log("log b global: " + b);
// // will give error because hello is a local variable in function above
// //console.log(hello);

// // const headEl = document.querySelector(".heading");
// // console.log(headEl.innerHTML);
// // function calculatePrice(userInput) {
// //   const price = userInput + 1000 + 3000;
// //   return price;
// // }

// // console.log(calculatePrice(5000));
// // const currentValue = calculatePrice(10000);
// // console.log(currentValue);

// //headEl.innerHTML = currentValue;
// //calculatePrice();
// //console.log(5);
// //console.log(floorOptions[1]);

// // traditional functions
// // function calculatePrice(sqMeters) {
// //   const price = 1000 + sqMeters;
// //   return price;
// // }

// // console.log(calculatePrice(10000));

// // var calculatePrice = function (sqMeters) {
// //   const price = 1000 + sqMeters;
// //   return price;
// // };

// // console.log(calculatePrice(500));

// /////////// arrow function //////////
// // const calculatePrice = (sqMeter) => {
// //   const price = 1000 + sqMeter;
// //   return price;
// // };

// // const calculatePrice = (sqMeter) => 1000 + sqMeter;

// // console.log(calculatePrice(400));

// ////////////////////
// // string concatenation vs template literals
// // const price = 9000;
// // const result = "The total cost will be: price";
// // const resultConcat =
// //   "The total cost will be: " + "line 1 " + "line 2 " + "line 3 " + price;

// // const resultLiteral = `The total cost will be:
// // line 2
// // line 3
// // line 4 ${price}`;
// // console.log(result);
// // console.log(resultConcat);
// // console.log(resultLiteral);

// //////////////////////////
// // if else
// // const price = "2000";
// // const price2 = 2000;
// // if (price === 2000) {
// //   console.log("price is 2000");
// // } else {
// //   console.log("price is not equal to 2000");
// // }

// // console.log(`price is a ${typeof price} and price2 is a ${typeof price2}`);
// /// ternary operator
// // price === 2000
// //   ? console.log("tern price is 2000")
// //   : console.log("tern price is not equal to 2000");
// //ok ext push the line down from 82 to 83.

// //////// manipulating html and css
// // this stuff just explains objects and where console and document comes from. see below for the actual stuff on manipulating html etc...
// // const employee = {
// //   fname: "John",
// //   lname: "Smith",
// // };
// // console.log(employee.fname); // Should log "John"

// // //////////// from chat GPT for
// // // Logging to the console
// // console.log("Hello, world!");

// // // Accessing the DOM
// // console.log(document.title);

// // // Setting a timer
// // setTimeout(() => {
// //   console.log("This message is displayed after 2 seconds");
// // }, 2000);

// // // Fetching data from an API
// // fetch("https://jsonplaceholder.typicode.com/posts/1")
// //   .then((response) => response.json())
// //   .then((data) => console.log(data))
// //   .catch((error) => console.error("Error:", error));

// // // Storing data in localStorage
// // localStorage.setItem("username", "JohnDoe");
// // console.log(localStorage.getItem("username"));

// // // Adding an event listener to a button
// // document.querySelector("button").addEventListener("click", () => {
// //   alert("Button clicked!");
// // });

// /// cont...manip html and css
// //const headingEl = document.querySelector(".heading");
// //const spanEl = document.querySelector(".span");

// // console.log(headingEl.innerHTML);
// // console.log(headingEl.textContent);

// // const fname = `<h2>chris</h2>`;

// // headingEl.innerHTML = `${fname}`;
// // // Setting a timer
// // setTimeout(() => {
// //   console.log("This message is displayed after 2 seconds");
// //   headingEl.textContent = `${fname}`;
// // }, 5000);

// //headingEl.textContent = `Hello <span class="heading--big">everyone</span>`;
// //headingEl.innerHTML = `Hello <span class="span">everyone</span>`;

// const headingEl = document.querySelector(".heading");

// headingEl.insertAdjacentHTML(
//   "beforebegin",
//   `. Hello <span class="span">everyone</span>`
// );
// //spanEl.classList.add("span");
// const spanEl = document.querySelector(".span");
// const mouseoverHandler = () => {
//   spanEl.classList.add("heading--big");
// };
// const mouseoutHandler = () => {
//   spanEl.classList.remove("heading--big");
// };

// spanEl.addEventListener("mouseover", mouseoverHandler);
// spanEl.addEventListener("mouseout", mouseoutHandler);

async function decode(message_file) {
  try {
    const response = await fetch(message_file);
    const text = await response.text();
    const lines = text.trim().split("\n");
    const data = lines.map((line) => {
      const [number, ...words] = line.split(" ");

      return { number: parseInt(number, 10), word: words.join(" ") };
    });

    data.sort((a, b) => a.number - b.number);

    let decodedMessage = "";
    let count = 1;
    let index = 0;

    while (index < data.length) {
      const lineWords = data[index].word.split(" ");
      console.log(lineWords);
      decodedMessage += lineWords[lineWords.length - 1] + " ";
      index += count + 1;
      count++;
    }

    return decodedMessage.trim();
  } catch (error) {
    console.error("Error decoding the message:", error);
  }
}

decode("coding_qual_input.txt").then((decodedMessage) => {
  console.log("Decoded message:", decodedMessage);
  console.log(decodedMessage);
  return decodedMessage;
});
