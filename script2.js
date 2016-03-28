//Объект "Шахматная доска"

function ChessTable()
{
    //Метод создания Шахматной доски.
    
    this.create = function()
    {
        var myTable = document.getElementById('Mytable').children[0];
        var myRow = 8;
        var myCol = 8;
        
        //Генерируем поле 8*8 и дополнительно левые клетки c цифрами для обозначения рядов
        
        for (var i = 0; i < myRow; i++)
        {
            //Создаем новую строку в таблице
            myTable.appendChild(document.createElement('tr'));
            var NewRow=myTable.children[i+1];
            
            //Создаем первый элемент, снимаем рамку и нумеруем
            NewRow.appendChild(document.createElement('td'));
            NewRow.children[0].style.border="1px solid transparent";
            NewRow.children[0].innerHTML= "" + (i + 1);
            
            //Создаем еще myCol клеток
            for (var j = 1; j <= myCol; j++)
            {
                NewRow.appendChild(document.createElement('td'));
            }
        }
        //Закрашиваем клетки через одну
        
        for(j = 1; j <= myRow; j++)
        {
            var i;
            if(j%2 == 0){
                i = 2;
            }
            else{
                i = 1;
            }
            for(i; i <= myCol; i+= 2)
            {
               myTable.children[j].children[i].style.backgroundColor="gray"; 
            }
        }
    }
}

//Объект Поле
function Field(node){
    var myTable = document.getElementById('Mytable');
    var selectedTd;
    var lit = ['0','A','B','C','D','E','F','G','H'];
    //var r = node.parrentElement.rowIndex;
    //var c = node.cellIndex;
    
    this.hightlight = function (node) 
    {
      if (selectedTd) {
        selectedTd.classList.remove('highlight');
      }
        selectedTd = node;
        selectedTd.classList.add('highlight');
    }

    this.print = function (){
        var r = selectedTd.parentElement.rowIndex;
        var c = selectedTd.cellIndex;
        var cl = lit[c];
        document.getElementById('log').innerHTML += cl + r + ', ';   
    }
    this.toLeft = function (){
        var r = node.parrentElement.rowIndex;
        var c = node.cellIndex;
        var cnew = c - 1;
        if(c <= 1){cnew = 1}
        var newCell = myTable.rows[r].cells[cnew];
        this.highlight(newCell);
        if(c > 1)this.print();
    }
    this.toUp = function (){
        var r = node.parrentElement.rowIndex;
        var c = node.cellIndex;
            var rnew = r - 1;
            if(r <= 1){rnew = 1}
            var newCell = myTable.rows[rnew].cells[c];
            highlight(newCell);
            if(r > 1)printSelected();        
    }
    this.toRight = function (){
        var r = node.parrentElement.rowIndex;
        var c = node.cellIndex;
            var cnew = c + 1;
            if(c >= 8){cnew = 8}
            var newCell = myTable.rows[r].cells[cnew];
            highlight(newCell);
            var cl = lit[cnew];
            if(c < 8)printSelected();       
    }
    this.toDown = function (){
        var r = node.parrentElement.rowIndex;
        var c = node.cellIndex;
            var rnew = r + 1;
            if(r >= 8){rnew = 8}
            var newCell = myTable.rows[rnew].cells[c];
            highlight(newCell);
            var cl = lit[c];
            if(r < 8)printSelected();        
    }
    

}

window.onload = function()
{
    var myChess = new ChessTable();
    myChess.create();
    var node;
    //var myField = new Field(node);
    var myTable = document.getElementById('Mytable');
    myTable.onclick = function(event)
    {
      var target = event.target;

      while (target != this) {
        var r = target.parentElement.rowIndex;
        var c = target.cellIndex;
        var myField = new Field(target);  
          //alert(r+"  :"+c);
          //alert((target.tagName == 'TD') && ( (r>0) && (c>0)));
        if (target.tagName == 'TD' && r>0 && c>0 )
        {
            myField.hightlight(target);
            myField.print();
          return;
        }
        target = target.parentNode;
      }
    }
    window.onkeydown=function(event){

        switch(event.keyCode){
            case 37:
                myField.toLeft();
                break;
            case 38:
                myField.toUp();
                break;
            case 39:
                myField.toRight();
                break;
            case 40:
                myField.toDown();
                break;            
        }
    }    
}


/*

var myTable = document.getElementById('Mytable');
var selectedTd;
var lit = ['0','A','B','C','D','E','F','G','H'];

myTable.onclick = function(event)
{
  var target = event.target;

  while (target != this) {
    var r = target.parentElement.rowIndex;
    var c = target.cellIndex;
      //alert(r+"  :"+c);
      //alert((target.tagName == 'TD') && ( (r>0) && (c>0)));
    if (target.tagName == 'TD' && r>0 && c>0 )
    {
        highlight(target);
        printSelected();
      return;
    }
    target = target.parentNode;
  }
}

function highlight(node) 
{
  if (selectedTd) {
    selectedTd.classList.remove('highlight');
  }
    selectedTd = node;
    selectedTd.classList.add('highlight');
}

function printSelected(){
    var r = selectedTd.parentElement.rowIndex;
    var c = selectedTd.cellIndex;
    var cl = lit[c];
    document.getElementById('log').innerHTML+=' ' + cl + r + ', ';   
}

window.onkeydown=function(event){
    switch(event.keyCode){
        case 37:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var cnew = c - 1;
            if(c <= 1){cnew = 1}
            var newCell = myTable.rows[r].cells[cnew];
            highlight(newCell);
            if(c > 1)printSelected();
            break;
        case 38:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var rnew = r - 1;
            if(r <= 1){rnew = 1}
            var newCell = myTable.rows[rnew].cells[c];
            highlight(newCell);
            if(r > 1)printSelected();
            break;
        case 39:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var cnew = c + 1;
            if(c >= 8){cnew = 8}
            var newCell = myTable.rows[r].cells[cnew];
            highlight(newCell);
            var cl = lit[cnew];
            if(c < 8)printSelected();
            break;
        case 40:
            var r = selectedTd.parentElement.rowIndex;
            var c = selectedTd.cellIndex;
            var rnew = r + 1;
            if(r >= 8){rnew = 8}
            var newCell = myTable.rows[rnew].cells[c];
            highlight(newCell);
            var cl = lit[c];
            if(r < 8)printSelected();
            break;            
    }
}




*/