//URL
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";


const one = "   halooo"
console.log(one.trim());
//SELECTOR DIVS
const result = document.querySelector(".result");
const wordMean = document.querySelector(".word-meaning");
const example = document.querySelector(".word-example");
const definition = document.querySelector(".definition");

let inputData = document.querySelector("#inp-word")

//SELECTOR BUTTON
const button = document.querySelector("#search-btn");
console.log(button);


//BUTTON HAS EVENT 
button.addEventListener("click", testValue)
//TESTING THE INPUT 
function testValue() {
  const checkINPT = inputData.value.trim();
  checkINPT === "" ? alert("please Input a Word")
    : createElement();
}

//MAIN FUNCTION 
function createElement() {
  let inpWord = document.querySelector("#inp-word").value.trim();

  wordMean.innerHTML = ""

  fetch(`${url}${inpWord}`)
    .then((respone) => respone.json())
    .then((data) => {
      console.log(data)


      //RESULT DIV 
      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button>b</button>
        </div>

        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
        </div>`;

      //DEFINITIONS DIV
      definition.innerHTML = `<h3>definitions : </h3>`


      const definitionsIndex = data[0].meanings[0].definitions;
      console.log(definitionsIndex);

      for (let i = 0; i < definitionsIndex.length; i++) {
        const splitDefinition = definitionsIndex[i].definition.split(";");
        for (let n = 0; n < splitDefinition.length; n++) {
          const li = document.createElement("li")
          li.textContent = splitDefinition[n]
          wordMean.appendChild(li)
        }
      }


      //EXAMPLE DIV 
      example.innerHTML = `${data[0].meanings[0].definitions[0].example || "there's no an example"}`
    })

    .catch(() => {
      result.innerHTML =
        ` 
        <div class="error-rslt">
          <p>cannot find the word</p>
          <div class="error-cause">
            <p>Please check your input correctly. There are several possible causes of the error: </p>
            <ul>
              <li> Make sure the word is an English word </li>
              <li> Misspelled word </li>
              <li> Check your internet connection </li>
              <li> The word may not be in the dictionary database </li>
            </ul>
          </div>
        </div>`;

      example.innerHTML = "";
      definition.innerHTML = "";
    });
}





