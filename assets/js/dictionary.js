const createDivDisplay = (objWord, audio) => {
  const divDisplay = document.createElement('div');
  divDisplay.classList.add('div-display-word');
  
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.innerHTML = objWord.word;

  const span = document.createElement('span');
  span.innerHTML = objWord.phonetic;

  const buttonPlay = document.createElement('button');
  const imgPlay = document.createElement('img');
  imgPlay.id = 'img-play-btn';
  imgPlay.src= "../Dictionary Web App/assets/images/icon-play.svg";
  imgPlay.alt = "icon of play button";

  imgPlay.addEventListener('click', (e) => {
    e.preventDefault();

    window.open(audio, '_blank');
  });

  buttonPlay.appendChild(imgPlay);

  div.append(h2, span);

  divDisplay.append(div, buttonPlay);

  return divDisplay;
};

const createDivDefinition = (objMeaning) => {
  const divDefinition = document.createElement('div');
  divDefinition.classList.add('div-definitions');
  divDefinition.id = `div-${objMeaning.partOfSpeech}`;

  const divPartOfSpeech = document.createElement('div');
  divPartOfSpeech.innerHTML = objMeaning.partOfSpeech;

  const divMeaning = document.createElement('div');
  divMeaning.classList.add('div-meaning');

  const h3Meaning = document.createElement('h3');
  h3Meaning.innerHTML = 'Meaning';

  const listMeanings = document.createElement('ul');
  listMeanings.classList.add('list-meanings');

  const definitions = objMeaning.definitions;

  for (let i = 0; i < definitions.length; i++) {
    const objDefinition = definitions[i];

    const listItemMeaning = document.createElement('li');
    listItemMeaning.innerHTML = objDefinition.definition;

    if (objDefinition.example) {
      const divExample = document.createElement('div');
      divExample.classList.add('div-example');
      divExample.innerHTML = `"${objDefinition.example}"`;

      listItemMeaning.append(divExample);
    }
    listMeanings.append(listItemMeaning);
  }

  divMeaning.append(h3Meaning, listMeanings);

  divDefinition.append(divPartOfSpeech, divMeaning);

  if (objMeaning.synonyms.length) {
    const divSynonyms = document.createElement('div');
    divSynonyms.classList.add('div-synonyms');
    const listSynonyms = document.createElement('ul');
    listSynonyms.classList.add('list-synonyms');
    const h3Synonyms = document.createElement('h3');
    h3Synonyms.innerHTML = 'Synonyms';
  
    for (let j = 0; j < objMeaning.synonyms.length; j++) {
      const synonym = objMeaning.synonyms[j];
      const listItemSynonym = document.createElement('li');
      listItemSynonym.classList.add('list-item-synonym');
      listItemSynonym.innerHTML = synonym;
      listSynonyms.append(listItemSynonym);
    }

    divSynonyms.append(h3Synonyms, listSynonyms);
    divDefinition.append(divSynonyms);
  }

  return divDefinition;
}

const removeDivs = () => {
  const divDisplayWord = document.querySelector('.div-display-word');
  const currentDivDefinitions = document.getElementsByClassName('div-definitions');
  const copyDivDefinitions = Array.from(currentDivDefinitions);

  // remove div that has class name 'div-display-word'
  divDisplayWord.remove();

  // remove each div that is class named as 'div-definitions'
  for (let i = 0; i < copyDivDefinitions.length; i++) {
    copyDivDefinitions[i].remove();
  }
}

const updatePage = (objWord) => {
  const main = document.querySelector('main');
  const divMain = document.querySelector('.div-main');
  const btnSource = document.getElementById('btn-source-wiktionary');
  let audio;

  removeDivs();

  // Iterate through the phonetics, and look for the phonetic that contains the audio file to implement into the play button for user to hear the word be pronounced.
  for (let i = 0; i < objWord.phonetics.length; i++) {
    const phonetic = objWord.phonetics[i];

    if (phonetic.audio) {
      audio = phonetic.audio;
    }
  }

  const divDisplay = createDivDisplay(objWord, audio);
  divMain.append(divDisplay);
 
  const wordMeanings = objWord.meanings;
  for (let j = 0; j < wordMeanings.length; j++) {
    const wordMeaning = wordMeanings[j];
    const divDefinition = createDivDefinition(wordMeaning);
    main.append(divDefinition);
  }

  btnSource.innerHTML = objWord.sourceUrls[0];

  btnSource.addEventListener('click', (e) => {
    e.preventDefault();
    const htmlLocation = btnSource.innerHTML;

    window.open(htmlLocation, '_blank');
  })
};

document.addEventListener('DOMContentLoaded', () => {
  const formDictionary = document.getElementById("form-user-word");
  const btnSource = document.getElementById('btn-source-wiktionary');
  const imgPlayBtn = document.getElementById('img-play-btn');

  formDictionary.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputWord = document.getElementById("input-word").value;

    const http = new XMLHttpRequest();

    http.onload = () => {
      if (http.readyState === http.DONE && http.status === 200) {
        const response = JSON.parse(http.response);
        const responseWord = response[0];

        updatePage(responseWord);
      }
    }
  
    http.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`, true);
    http.send();
  });

  btnSource.addEventListener('click', (e) => {
    e.preventDefault();
    const htmlLocation = btnSource.innerHTML;

    window.open(htmlLocation, '_blank');
  });

  imgPlayBtn.addEventListener('click', (e) => {
    e.preventDefault();

    window.open('https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3', '_blank');
  })
});