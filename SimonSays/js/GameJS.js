      const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta')
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const counter = document.getElementById('counter');
      const ultimo_lvl = 2;

      // swal('hola')

      class Juego {
        constructor() {
          this.inicializar ()
          this.generarSecuencia()
          this.siguienteNivel()
        }

        inicializar() { 
          this.inicializar = this.inicializar.bind(this)         
          this.elegirColor = this.elegirColor.bind(this)
          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.toggleBtnEmpezar()          
          counter.classList.add('show');
          // this.iluminarSecuencia();
          this.cuentaRegresiva();          
          this.nivel = 1
          this.colores = {
            celeste,
            violeta,
            naranja,
            verde 
          }
        }

        toggleBtnEmpezar(){
          if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
          }else{
            btnEmpezar.classList.add('hide')
          }
        }
        generarSecuencia(){
          //funcion fill es necesaria para que luego podamos llamar a map (definicion de elementos iniciales)          
          this.secuencia = new Array(ultimo_lvl).fill(0).map(n => Math.floor(Math.random()*4))// -> Permite decidir que colores se iluminaran

          //FOREACH
          // this.secuencia = [];
          // new Array(10).fill(0).forEach(n => {
          //   this.secuencia.push(Math.floor(Math.random()*4))
          // })
          //console.log(this.secuencia)
        }

        siguienteNivel(){
          this.subnivel = 0 
          //si no esta declarado, aparecera en el objeto aun cuando este no esta en el constructor
          // this.nombreAtributo = 'valor'
          this.iluminarSecuencia()
          this.agregarEventosClick()
        }
 
        transformarNumeroAColor(numero){
          switch(numero){
            case 0: 
              return "celeste"
            case 1: 
              return 'violeta'
            case 2: 
              return 'naranja'
            case 3:
              return 'verde' 
          }
        }

        transformarColorANumero(color){
          switch(color){
            case 'celeste': 
            return 0
            case 'violeta': 
            return 1
            case 'naranja': 
            return 2
            case 'verde':
            return 3
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
        

          //Cuenta regresiva empieza con esta funcion
        iluminarSecuencia(){
          setTimeout(()=>{
            for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            // console.log(color)
            setTimeout(() => this.iluminarColor(color), 1000 * i)
          }
        },3000)
          

        }

        iluminarColor(color){
          this.colores[color].classList.add('light')
          setTimeout(()=>this.apagarColor(color), 350)
        }

        apagarColor(color){
          this.colores[color].classList.remove('light')
        }

        agregarEventosClick() {
          console.log("AGREGAR EVENTO: "+this.colores)
          //bin(this) considera a this como el botton y no como el color
          // this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
          this.colores.celeste.addEventListener('click', this.elegirColor)
          // this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
          this.colores.verde.addEventListener('click', this.elegirColor)
          // this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
          this.colores.violeta.addEventListener('click', this.elegirColor)
          // this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
          this.colores.naranja.addEventListener('click', this.elegirColor)
        }

        eliminarEventosClick() {
          //bin(this) considera a this como el botton y no como el color
          // this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
          this.colores.celeste.removeEventListener('click', this.elegirColor)
          // this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
          this.colores.verde.removeEventListener('click', this.elegirColor)
          // this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
          this.colores.violeta.removeEventListener('click', this.elegirColor)
          // this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
          this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev){
          //Dentro de las variables de ev aparece una llamada dataset que indica el color  utilizado
          const nombreColor = ev.target.dataset.color
          console.log(nombreColor)
          const numeroColor = this.transformarColorANumero(nombreColor)
          console.log(nombreColor+"/"+nombreColor)
          this.iluminarColor(nombreColor)
          if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel === this.nivel){
              this.nivel++
              //si pasa de lvl puede llegar al ultimo lvl y gana el juego, o simplemente pasar de lvl 
              this.eliminarEventosClick()
              if(this.nivel == (ultimo_lvl+1)){
                //GANO
                this.ganoElJuego()
              }else{
                setTimeout(this.siguienteNivel,1500)
                
              }

            }
          }else{
            // perdio
            this.perdioElJuego()

          }
        } 

        ganoElJuego(){
          Swal.fire({
            icon: 'success',
            title: 'SimonSays',
            text: 'Ganaste!'
          })
          .then(this.inicializar)
        }

        perdioElJuego(){
          Swal.fire({
            icon: 'error',
            title: 'SimonSays',
            text: 'Has Perdido...'
          })
          .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
          })
        }




      

      }

      function empezarJuego() {
        // var juego = new Juego()
        window.juego = new Juego()
      }