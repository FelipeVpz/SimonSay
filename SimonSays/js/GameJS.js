 const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const counter = document.getElementById('counter');

      class Juego {
        constructor() {
          this.inicializar()
          this.generarSecuencia()
        }

        inicializar() {
          btnEmpezar.classList.add('hide')
          counter.classList.add('show');
          this.cuentaRegresiva();
          this.nivel = 1
          this.colores = {
            celeste,
            violeta,
            naranja,
            verde
          }
        }

        generarSecuencia(){
          //funcion fill es necesaria para que luego podamos llamar a map (definicion de elementos iniciales)          
          this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))// -> Permite decidir que colores se iluminaran

          //FOREACH
          // this.secuencia = [];
          // new Array(10).fill(0).forEach(n => {
          //   this.secuencia.push(Math.floor(Math.random()*4))
          // })
          //console.log(this.secuencia)
        }

        siguienteNivel(){
          this.iluminarSecuencia()
        }

        iluminarSecuencia(){
          for (var i = 0; i < this.nivel; i++) {
           
          }

        }

        cuentaRegresiva(){
        let i = 3;
        counter.innerHTML = i;
        setTimeout(()=>{
            i=2;
            counter.innerHTML = i;            
        },1000);
        setTimeout(()=>{
            i=1;
            counter.innerHTML = i;        
        },2000);
        setTimeout(()=>{
            counter.style.display='none';       
        },2500);
    }

      }

      function empezarJuego() {
        // var juego = new Juego()
        window.juego = new Juego()
      }