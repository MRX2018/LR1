(function( $ ) {
    var methods = {
        start : function () {
          (function(elid, width, height, speed, strength){
            var canvas = document.querySelector(elid),
                    ctx = canvas.getContext("2d"),
                    pos = 0, blocks = [], curHeight = 10000, mousePos, newHeight = -1;
            canvas.width = width; canvas.height = height;ctx.fillStyle = "black";
            var game = setInterval(function(){
                strength+= 0.001;
                var tetha = (strength > 0.6)? 0.6: strength;
                if( Math.random() < tetha ) blocks.push([Math.random()*(width-10),height + 10, 10 + Math.random()*40]);
                ctx.clearRect(0,0,width,height);
                ctx.beginPath(); ctx.arc(pos+5,curHeight+5,5,0,2*Math.PI); ctx.fill();
                for(var i = 0; i < blocks.length; i++){
                    ctx.fillRect(blocks[i][0],blocks[i][1],blocks[i][2], 10);
                    if( blocks[i][0] - 5 < pos && (blocks[i][0] + blocks[i][2] - 5 > pos) &&  (curHeight - blocks[i][1] < 0 && curHeight - blocks[i][1] > -15) && curHeight == newHeight)
                    newHeight = blocks[i][1]-15;
                    if( blocks[i][1] < 0 )
                        blocks.splice( i--, 1);
                    else 
                        blocks[i][1] -= 5;
                }
                if (curHeight == newHeight)
                    newHeight = curHeight +=10 * ((strength > 0.6)? 0.6: strength) ;
                if((!(curHeight = newHeight) || curHeight < -1 || curHeight > height) && clearInterval(game) == undefined )
                    alert("Игра завершена! Вы набрали " + Math.floor(1000 * strength) + " очков.");
                pos += (Math.abs(pos - mousePos ) > 10)? (mousePos > pos) ? ((mousePos < width)? 10 : 0) : ((mousePos > 0)? -10:0) : 0;
            }, speed);
            document.addEventListener('mousemove', function (e) { mousePos = e.pageX; }, false);
        })("#canvas",400,300,33,0.05);
}}
     $.fn.myPlugin = function(method) { 
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
          } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
          } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
          } 
          return this.each(methods[start]);
        };
      })( jQuery );