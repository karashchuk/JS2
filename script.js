var selectedTd;

//Объект "Шахматная доска"
//
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
            
            //Создаем еще myCol клеток и раскрашиваем
            for (var j = 1; j <= myCol; j++)
            {
                NewRow.appendChild(document.createElement('td'));
                if ((i+j)%2==1){
                    myTable.children[i+1].children[j].style.backgroundColor="gray";
                }
            }
        }
        var myTable = document.getElementById('Mytable');
        selectedTd = myTable.rows[1].cells[1];
    }
}

//Объект Поле
//
var selectedTd;
function Field(node){
    var myTable = document.getElementById('Mytable');
    var lit = ['0','A','B','C','D','E','F','G','H'];
    var r = selectedTd.parentElement.rowIndex;
    var c = selectedTd.cellIndex;
    
    //Метод выделения ячейки
    this.hightlight = function (node) 
    {
        if (selectedTd) {
        selectedTd.classList.remove('highlight');
      }
        selectedTd = node;
        selectedTd.classList.add('highlight');
    }

    //Метод вывода адреса ячейки
    this.print = function (){
        var cl = lit[c];
        document.getElementById('log').innerHTML += cl + r + ', ';   
    }
    
    //Методы сдвига ячейки по стрелке
    this.toLeft = function (){
        var cnew = c - 1;
        if(c <= 1) cnew = 1;
        var newCell = myTable.rows[r].cells[cnew];
        this.hightlight(newCell);
        if(c > 1)this.print();
    }
    this.toUp = function (){
        var rnew = r - 1;
        if(r <= 1) rnew = 1;
        var newCell = myTable.rows[rnew].cells[c];
        this.hightlight(newCell);
        if(r > 1)this.print();        
    }
    this.toRight = function (){
        var cnew = c + 1;
        if(c >= 8) cnew = 8;
        var newCell = myTable.rows[r].cells[cnew];
        this.hightlight(newCell);
        if(c < 8)this.print();       
    }
    this.toDown = function (){
        var rnew = r + 1;
        if(r >= 8) rnew = 8;
        var newCell = myTable.rows[rnew].cells[c];
        this.hightlight(newCell);
        if(r < 8)this.print();        
    }
    

}

window.onload = function()
{
    var myChess = new ChessTable();
    myChess.create();
    var myTable = document.getElementById('Mytable');
    
    //Действие при выделении мышкой
    myTable.onclick = function(event)
    {
      var target = event.target;

      while (target != this) {
          var r = target.parentElement.rowIndex;
          var c = target.cellIndex;
          var myField = new Field(target);
          
        if (target.tagName == 'TD' && r>0 && c>0 )
        {
            myField.hightlight(target);
            myField.print();
          return;
        }
        target = target.parentNode;
      }
    }
    //Действие при нажатии стрелок
    window.onkeydown=function(event){
        var myField = new Field (selectedTd);
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
