function populateUFs() {

    const ufSelect = document.querySelector("select[name=uf]");
    const url1 = "http://servicodados.ibge.gov.br/api/v1/localidades/estados";

    fetch(url1)
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs();

function getCities(event) {

    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url2 = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url2)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


//Ítens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    //Adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id;

    //Verificar se existem itens selecionados, se sim
    //Pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item =>  {
        const itemFound = item == itemId
        return itemFound;
    })

    //Se já estiver selecionado, retira da seleção
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems;
    } else {
        //Se não tiver selecionador, adiciona a seleção
        selectedItems.push(itemId);
    }
    console.log(selectedItems);

    //Atualizar com campo hidden com os itens selecionados
    collectedItems.value = selectedItems;
}

