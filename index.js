let addBtn= document.querySelector(".btn_add")
let mainInner = document.querySelector(".main_inner")
let trelloName =document.querySelector(".board_name")
let menuBtn = document.querySelector(".btn_menu")
let userBtn = document.querySelector(".user_icon")
let publictype = document.querySelector(".public_type")

addBtn.addEventListener("click", ()=>addModalBoard())
menuBtn.addEventListener("click", ()=>removeAll())


let boardArr=[]
let boardItemArr=[]
let boardId=0
let itemId=0



function createBoard(id, name,color){
    const  board = {
        "id":id,
        "name":name,
        "color":color,

    }
addBoard(board)
boardArr.push(board)
boardId++
exitModal()
console.log(boardArr)
addToLocalStorage("board");
}


function addBoard(element){
    let board=document.createElement("li")
    board.classList.add("board")
    document.querySelector(".board_inner").append(board)
    board.style.backgroundColor = element.color + "B3"
    board.innerHTML=`
    <div class="board_header">
    <input type="text" class="board_header_name" value="${element.name}">
    <div class="board_body">
    <ul class="boadr_body_list">

    </ul>
    </div>
    <div class="board_footer">
    <p class="add_board_item">Додати карточку</p>
    </div>   
    `


    let funcBtn=document.querySelector(".add_board_item")
    funcBtn.addEventListener('click', () => addBoardItemModal(element.id)) 
    console.log(element.id) 

}








function addModalBoard(){
    let modalWindow = document.createElement("div")
    modalWindow.classList.add("modal_window")
    document.querySelector("body").append(modalWindow)
    modalWindow.innerHTML=`
    <div class="window">
    <p class="modal_title">Створення нової доски</p>
    <label class="input_board_name_label" for="input_board_name">Ввеідть назву:</label>
    <textarea class="input_board_name" name="" cols="30" rows="2"></textarea>
    <label class="input_board_color_label" for="input_board_color">Виберіть колір:</label>
    <input type="color" value="#cccccc" class="input_board_color">

    <div class="btn_wrapper">
        <div class="add_item_btn">Створити</div>
        <div class="cancel_item_btn">Вийти</div>
    </div>

    </div>
`
    document.querySelector(".add_item_btn").addEventListener("click",()=> createBoard(boardId, document.querySelector(".input_board_name").value,document.querySelector(".input_board_color").value))
    document.querySelector(".cancel_item_btn").addEventListener("click",()=>exitModal())
}



function addBoardItemModal(boardId){ 
    let modalWindow = document.createElement('div');        
    modalWindow.classList.add('modal_window');
    document.querySelector("body").append(modalWindow);
    modalWindow.innerHTML =`
    <form name="createBoardItem">
    <div class="window">
    <p class="modal_title">Додавання карточки</p>
    <label class="input_board_card_name" for="title">Назва карточки</label>
    <input type="text" class="input_board_card_name_lab" name="">
    <label>Що робити </label>
    <textarea class="input_board_text" name=""></textarea>
    <div class="btn_item_wrapper">
    <div class="add_item_btn">Додати карточку</div>
    <div class="cancel_item_btn">Вийти</div>
    </div>
    </div>
   `
    btnAdd= document.querySelector(".add_item_btn")
    btnCanc=document.querySelector(".cancel_item_btn")
    btnAdd.addEventListener('click', () => createBoardItem(boardId, document.querySelector(".input_board_card_name_lab").value,document.querySelector(".input_board_text").value))    
    btnCanc.addEventListener('click', () => exitModal()) 
}
function createBoardItem(boardId,title,text){    
    const boardItem = {
        "boardId":  boardId,
        "title": title,     
        "text": text,

    }
    addBoardItem(boardItem);   
    boardItemArr.push(boardItem);
    itemId++
    addToLocalStorage("item");
    addToLocalStorage("board");
}



function addBoardItem(element){
    let boardItem = document.createElement('li')
    boardItem.classList.add('card_body_item')
    boardItem.setAttribute('item-index-number', element.itemId)
    boardItem.setAttribute('draggable', 'true')
    boardItem.innerHTML=` <div class="card_body_item">
        <div class="card_header_item"></div>
        <div class="card_title_item">${element.title}</div>
        <div class="card_tag_item">${element.text}</div>
        </div>
        `
 
                           
    document.querySelector('.board').prepend(boardItem)      

exitModal()
console.log(boardItemArr)
}
function exitModal(){
    if (document.querySelector(".modal_window")!=null){
        document.querySelector(".modal_window").remove()
    }
}

function removeAll(){
    document.querySelector(".board").remove(".board")
}

let addToLocalStorage = (type) =>{
    switch (type) {                                                                     
        case 'item':
            localStorage.setItem('boardItemArr', JSON.stringify(boardItemArr));
            localStorage.setItem('itemId', JSON.stringify(itemId))
            break;
        case 'board':
            localStorage.setItem('boardId', JSON.stringify(boardId))
            localStorage.setItem('boardArr', JSON.stringify(boardArr));
        default:

            break;
    }
    
}

