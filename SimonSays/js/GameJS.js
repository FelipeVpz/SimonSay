      const color1 = document.getElementById('color1')
      const color2 = document.getElementById('color2')
      const color3 = document.getElementById('color3')
      const color4 = document.getElementById('color4')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const counter = document.getElementById('counter');
      // counter.innerHTML = 0;
      const ultimo_lvl = 99999;

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
          // counter.classList.add('show');
          // this.iluminarSecuencia();                  
          this.nivel = 1          
          this.colores = {
            color1,
            color2,
            color3,
            color4 
          }
        }

        toggleBtnEmpezar(){
          if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
            // btnEmpezar.innerHTML = "Empezar a Jugar!"
          }else{
            // this.conteo()
            this.cuentaRegresiva();  
            if(this.cuentaRegresiva.bind()){
              // btnEmpezar.classList.add('hide')
            }
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

        sonidoColor(color){
          var audio_url = `../sounds/${color}.mp3`
          var audio = new Audio(audio_url);
          audio.play();
        }

        siguienteNivel(){
          counter.innerHTML = "Nivel: " + this.nivel;
          this.subnivel = 0 
          //si no esta declarado, aparecera en el objeto aun cuando este no esta en el constructor   
         
          this.iluminarSecuencia() 
          this.agregarEventosClick()          
        }
 
        transformarNumeroAColor(numero){
          switch(numero){
            case 0: 
              return "color1"
            case 1: 
              return 'color2'
            case 2: 
              return 'color3'
            case 3:
              return 'color4' 
          }
        }

        transformarColorANumero(color){
          switch(color){
            case 'color1': 
            return 0
            case 'color2': 
            return 1
            case 'color3': 
            return 2
            case 'color4':
            return 3
          }
        }

        conteo(){
          let i = 3;
          btnEmpezar.innerHTML = i;
          setTimeout(()=>{
            i=2;
            btnEmpezar.innerHTML = i;            
          },400);
          setTimeout(()=>{
            i=1;
            btnEmpezar.innerHTML = i;        
          },1000);
            setTimeout(()=>{
            i="GO!";
            btnEmpezar.innerHTML = i;        
          },1300);
          return 1;
        }

        cuentaRegresiva(){
          if(this.conteo()){
           setTimeout(()=>{
            console.log(this.conteo())
            btnEmpezar.style.display='none';       
          },1600); 
         }         
       } 


        

          //Cuenta regresiva empieza con esta funcion
        iluminarSecuencia(){
          // console.log("iluminarSecuencia")
          setTimeout(()=>{
            for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 500 * i)
          }
        },1700)
          

        }

        iluminarColor(color){
          // console.log("iluminarColor")
          this.colores[color].classList.add('light')
          this.sonidoColor(color);
          setTimeout(()=>this.apagarColor(color), 350)
        }

        apagarColor(color){
          this.colores[color].classList.remove('light')
        }

        agregarEventosClick() {
          
          //bin(this) considera a this como el botton y no como el color
          // this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color1.addEventListener('click', this.elegirColor)
          // this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color2.addEventListener('click', this.elegirColor)
          // this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color3.addEventListener('click', this.elegirColor)
          // this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color4.addEventListener('click', this.elegirColor)
        }

        eliminarEventosClick() {
          //bin(this) considera a this como el botton y no como el color
          // this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color1.removeEventListener('click', this.elegirColor)
          // this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color2.removeEventListener('click', this.elegirColor)
          // this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color3.removeEventListener('click', this.elegirColor)
          // this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
          this.colores.color4.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev){
          // console.log("elegirColor")
          //Dentro de las variables de ev aparece una llamada dataset que indica el color  utilizado
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.transformarColorANumero(nombreColor)
          this.sonidoColor(nombreColor);          
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
                setTimeout(this.siguienteNivel,500)
                
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
            text: `Has Perdido... LLegaste a nivel  ${this.nivel}`
            
          })          
          .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
            if(confirm){
            location.reload();
          }
          })
        }




      

      }

      function empezarJuego() {
        // var juego = new Juego()
        window.juego = new Juego()
      }