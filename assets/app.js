const fromLang = document.getElementById("from_lang");
const toLang = document.getElementById("to_lang");
const fromText = document.getElementById("from_text");
const toText = document.getElementById("to_text");
const translateBtn = document.getElementById("translate");
const exchange = document.querySelector("#exchange");
const fromCopy = document.querySelector(".from-copy");
const fromVoice = document.querySelector(".from-voice");
const toCopy = document.querySelector(".to-copy");
const toVoice = document.querySelector(".to-voice");
const icons = document.querySelectorAll(".icons");

for(let lang in languages) {
    let option = `
    <option value="${lang}">${languages[lang]}</option>
    `
    fromLang.insertAdjacentHTML("beforeend",option);
    toLang.insertAdjacentHTML("beforeend",option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

translateBtn.addEventListener("click", () => {

    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;

    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

    fetch(url)
     .then(resp => resp.json())
     .then(data => {
        toText.value = data.responseData.translatedText;
     })
})

exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
})

for(let icon of icons) {
    icon.addEventListener("click", (element) => {
        
       if(element.target.classList.contains("fa-copy")) {

            if(element.target.classList.contains("from-copy")) {
                navigator.clipboard.writeText(fromText.value);
                element.target.classList = "fa-solid text-success fa-circle-check"
                setTimeout(() => {
                    element.target.classList = "fa-regular fa-copy from-copy icons"
                },1000);
                
            } else if(element.target.classList.contains("to-copy")) {
                navigator.clipboard.writeText(toText.value);
                element.target.classList = "fa-solid text-success fa-circle-check"
                setTimeout(() => {
                    element.target.classList = "fa-regular fa-copy to-copy icons"
                },1000);
            }

       } else if(element.target.classList.contains("fa-volume-high")) {
            let utterance;

        if(element.target.classList.contains("from-voice")) {
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = fromLang.value;

        } else if(element.target.classList.contains("to-voice")) {
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = toLang.value;
        }
            speechSynthesis.speak(utterance);
       }
    })
}