var alogo = document.createElement("IMG")
alogo.src = "https://github.com/JuniperMakesStuff/RhythmGameOpenAlpha/blob/master/untitled%20-%202019-05-28T161851.899.png?raw=true"

var camx=0
var camy=0
var shakep=0
var mul = 0
var pvall = 0
var pvall2 = 0
var vismodenoskip = true
var heightmult = 1.5
var camrot = 0
var camsize = 1
var bouncemod = 4
document.addEventListener('mousemove',function(event){
  mx = event.clientX
  my = event.clientY
})
var mx = 0
var my = 0
var all=0;
var shuffle=0;
var shuffleglide = 0;
var holdtime1 = 0;
var files = this.files
var selected = 0;
var previousall = 0;
var avg = 0;
var time = 0;
window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
    files = this.files;
    selected = 0;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    audio.loop = false;
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    //var canvas2 = document.getElementById("canvas2");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight
    var ctx = canvas.getContext("2d");
    //var ctx2 = document.getElementById("canvas2").getContext("2d") 
    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.5;

    var bufferLength = analyser.frequencyBinCount;
    //console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);
    var dataArray2 = []//new Uint8Array(bufferLength);
    var dataArray3 = []//new Uint8Array(bufferLength
    var dataArray4 = [[]]
    var dataArray5 = [[]]
    var dataArray6 = [[]]
    for(i=0;i<bufferLength;i++){
      dataArray2[i]=0
      dataArray3[i]=0
      dataArray4[i]=[0,0]
      dataArray5[i]=[0,0]
      dataArray6[i]=[0,0]
    }

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      ctx.globalCompositeOperation = "screen"
      //ctx2.globalCompositeOperation = "screen"
      if(my<40){
      document.documentElement.style.setProperty('--transx','0px')
        document.documentElement.style.setProperty('--transy','0px')
        document.documentElement.style.setProperty('--transr','0deg')
        document.documentElement.style.setProperty('--transsc','1')
  
      }else{
      document.documentElement.style.setProperty('--transx','-100px')
        document.documentElement.style.setProperty('--transy','-20px')
        document.documentElement.style.setProperty('--transr','-90deg')
        document.documentElement.style.setProperty('--transsc','0')
  
      }
      
      all=0;
      previousall=(previousall-5000)*2
      bouncemod=(6-(previousall/4000))
      if(bouncemod<2){
        bouncemod=2
      }
      if(bouncemod>6){
        bouncemod=6
      }
      requestAnimationFrame(renderFrame);
      //time++;
      x = 0

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      var minH = 9999
      for (i = 10; i < (bufferLength-1)/7; i++){if(dataArray[i-1]<minH){minH=dataArray[i-1]}}
      for (i = 1; i < (bufferLength-1); i++){all+=dataArray[i-1];if(dataArray[i-1]-minH<0){dataArray[i-1]=0}else{dataArray[i-1]-=minH}}
      
      for (i = 1; i < (bufferLength-1); i++) {
        
        //dataArray[i-1]-=50
        if(dataArray[i-1]<0){
          dataArray[i-1]=0
        }
        if(dataArray[i-1]>9999999){
          dataArray[i-1]=0
        }
        //dataArray[i-1]
        ctx.fillStyle="#000000"
        ctx.strokeStyle = "#fff"
        var barWidth=1/bufferLength*WIDTH*2
        var barHeight0=dataArray2[i-1]*heightmult+HEIGHT/2
        var barHeight1=dataArray2[i]*heightmult+HEIGHT/2
        var barHeight2=dataArray2[i+1]*heightmult+HEIGHT/2
        var oofset = ((barHeight0-barHeight1)+(barHeight2-barHeight1))/-2
        //ctx.fillRect(x,HEIGHT-barHeight1,barWidth-1,barHeight1)
        ctx.beginPath();
        ctx.arc(x,HEIGHT-barHeight1-oofset,0,2*Math.PI,5)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(x-barWidth,HEIGHT-barHeight0)
        ctx.quadraticCurveTo(x,HEIGHT-barHeight1-oofset,x+barWidth,HEIGHT-barHeight2)
        ctx.stroke()
        ctx.strokeStyle="#ffffff"
        barHeight0=dataArray4[i-1][0]*heightmult+HEIGHT/2
        barHeight1=dataArray4[i][0]*heightmult+HEIGHT/2
        barHeight2=dataArray4[i+1][0]*heightmult+HEIGHT/2
        oofset = ((barHeight0-barHeight1)+(barHeight2-barHeight1))/-2
        ctx.beginPath()
        ctx.moveTo(x-barWidth,HEIGHT-barHeight0)
        ctx.quadraticCurveTo(x,HEIGHT-barHeight1-oofset,x+barWidth,HEIGHT-barHeight2)
        ctx.stroke()
        ctx.strokeStyle = "rgba(255,255,255,0.5)"
        barHeight0=dataArray5[i-1][0]*heightmult+HEIGHT/2
        barHeight1=dataArray5[i][0]*heightmult+HEIGHT/2
        barHeight2=dataArray5[i+1][0]*heightmult+HEIGHT/2
        oofset = ((barHeight0-barHeight1)+(barHeight2-barHeight1))/-2
        ctx.beginPath()
        ctx.moveTo(x-barWidth,HEIGHT-barHeight0)
        ctx.quadraticCurveTo(x,HEIGHT-barHeight1-oofset,x+barWidth,HEIGHT-barHeight2)
        ctx.stroke()
        barHeight0=dataArray6[i-1][0]*heightmult+HEIGHT/2
        barHeight1=dataArray6[i][0]*heightmult+HEIGHT/2
        barHeight2=dataArray6[i+1][0]*heightmult+HEIGHT/2
        oofset = ((barHeight0-barHeight1)+(barHeight2-barHeight1))/-2
        ctx.beginPath()
        ctx.moveTo(x-barWidth,HEIGHT-barHeight0)
        ctx.quadraticCurveTo(x,HEIGHT-barHeight1-oofset,x+barWidth,HEIGHT-barHeight2)
        ctx.stroke()
        var all2=all
        all2-=15000
        all2*=2
        time+=all2/50000000
        mul+=(((all2/bufferLength)/180)-mul)/20
        ctx.strokeStyle="#ffffff"
        var ind1 = i
        barHeight0=dataArray2[ind1-1]
        barHeight1=dataArray2[ind1]
        barHeight2=dataArray2[ind1+1]
        
        oofset = ((barHeight0-barHeight1)+(barHeight2-barHeight1))/-2
        ctx.beginPath()
        ctx.moveTo((WIDTH-2*(x-barWidth)),HEIGHT-barHeight0)
        ctx.quadraticCurveTo(WIDTH-2*x,HEIGHT-barHeight1-oofset,WIDTH-2*(x+barWidth),HEIGHT-barHeight2)
        ctx.stroke()
        
        barHeight0=dataArray2[ind1-1]
        barHeight1=dataArray2[ind1]
        barHeight2=dataArray2[ind1+1]
        
        oofset = ((barHeight0-barHeight1)+(barHeight2-barHeight1))/-2
        ctx.beginPath()
        ctx.moveTo((WIDTH-2*(x-barWidth)),barHeight0)
        ctx.quadraticCurveTo(WIDTH-2*x,barHeight1+oofset,WIDTH-2*(x+barWidth),barHeight2)
        ctx.stroke()
        
        
        x+=barWidth
        dataArray3[i-1]+=(((dataArray[i-1])*1.25)-dataArray2[i-1])
        
        dataArray3[i-1]/=3
        dataArray2[i-1]+=dataArray3[i-1]
        dataArray4[i-1][0]=-dataArray2[i-1]
        /*
        if(dataArray2[i-1]>dataArray4[i-1][0]){
          dataArray4[i-1][0]=dataArray2[i-1]
          dataArray4[i-1][1]=dataArray3[i-1]/bouncemod
        }else{
          dataArray4[i-1][1]-=1
        }
        dataArray4[i-1][0]+=dataArray4[i-1][1]
        */
        /*
        if(dataArray2[i-1]<dataArray5[i-1][0]){
          dataArray5[i-1][0]=dataArray2[i-1]
          dataArray5[i-1][1]=dataArray3[i-1]/bouncemod
        }else{
          dataArray5[i-1][1]+=1
        }
        dataArray5[i-1][0]+=dataArray5[i-1][1]
        */
        if(2*(dataArray2[i-1]-dataArray5[i-1][1])>dataArray5[i-1][0]){
        dataArray5[i-1][0]=2*(dataArray2[i-1]-dataArray5[i-1][1])}
        dataArray5[i-1][0]/=2
        dataArray5[i-1][1] = dataArray2[i-1]
        if(dataArray5[i-1][0]<0){dataArray5[i-1][0]=0}
        dataArray6[i-1][0]=-dataArray5[i-1][0]
      }
      
      all-=7000
      all/=2
      //camx+=((all/2000)*Math.random()-((all/2000)/2))
      //camy+=((all/2000)*Math.random()-((all/2000)/2))
      //camrot+=((all/20000)*Math.random()-((all/20000)/2))
      //camsize+=((all/1500000)*Math.random())
 
      
      shakep = (((((all/100)/2)-100)*8)+410)
      if (shakep>0){
        camx=(all/1000)*(Math.random()-0.5)
        camy=(all/1000)*(Math.random()-0.5)
        camrot=(all/15000)*(Math.random()-0.5)
        
      }
      
      document.documentElement.style.setProperty("--yeet",(time*10)+"deg")     
      document.documentElement.style.setProperty("--spc",(all/100)+"%")
      document.documentElement.style.setProperty("--aaa",all/7000+"px")
      //time+=all/150000
      document.documentElement.style.setProperty("--x",(5*Math.sin(time)+camx)+"px")
      document.documentElement.style.setProperty("--y",(5*Math.sin(time*1.1)+camy)+"px")
      document.documentElement.style.setProperty("--rot",(.5*Math.sin(time*1.2)+camrot)+"deg")
      document.documentElement.style.setProperty("--scale",camsize)
      
      camx/=1.1;
      camy/=1.1;
      camrot/=1.1;
      camsize/=1.1;
      previousall=all
      pvall/=2
      if (all>pvall){pvall = all}
      var sss = 190+(pvall/100)
      
      
      ctx.save()
      ctx.beginPath()
      ctx.arc(WIDTH/(8/7),HEIGHT/2,sss/2+5,0,Math.PI*2)
      ctx.clip()
      ctx.clearRect(0,0,WIDTH,HEIGHT)
      ctx.restore()
      
      
      ctx.drawImage(alogo,WIDTH/(8/7)-sss/2,HEIGHT/2-sss/2,sss,sss)
      ctx.fillStyle = "#ffffff"
      ctx.lineWidth = 2
      
      
      
      ctx.beginPath()
      ctx.arc(WIDTH/(8/7),HEIGHT/2,sss/2,0,Math.PI*2)
      ctx.stroke()
      
      
      
      //ctx.font = "100px arial"
      //ctx.strokeText(Math.floor(shakep),20,100)
      //console.log(all)
      
     //console.log(all);
     
      ctx.lineCap="round"
      
      if(vismodenoskip){ctx.strokeStyle = "rgba(255,255,255,0)"
         }else{ctx.strokeStyle = "rgba(255,255,255,1)"
              }
      
      ctx.beginPath();
      ctx.moveTo(WIDTH-80,HEIGHT-70);
      ctx.lineTo(WIDTH-60,HEIGHT-70);
      ctx.lineTo(WIDTH-40,HEIGHT-70+shuffle)
      ctx.lineTo(WIDTH-20,HEIGHT-70+shuffle)
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(WIDTH-30,HEIGHT-80+shuffle);
      ctx.lineTo(WIDTH-20,HEIGHT-70+shuffle);
      ctx.lineTo(WIDTH-30,HEIGHT-60+shuffle);
      ctx.stroke()
      
      ctx.beginPath();
      ctx.moveTo(WIDTH-80,HEIGHT-30);
      ctx.lineTo(WIDTH-60,HEIGHT-30);
      ctx.lineTo(WIDTH-40,HEIGHT-30-shuffle)
      ctx.lineTo(WIDTH-20,HEIGHT-30-shuffle)
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(WIDTH-30,HEIGHT-40-shuffle);
      ctx.lineTo(WIDTH-20,HEIGHT-30-shuffle);
      ctx.lineTo(WIDTH-30,HEIGHT-20-shuffle);
      ctx.stroke()
      
      //var mx = event.clientX;
      //var my = event.clientY;
      var dmx = (WIDTH-50)-mx
      var dmy = (HEIGHT-50)-my
      if (dmx<30 && dmy<30){
        holdtime1+=0.075;
        if (holdtime1>=2*Math.PI){
          holdtime1 = 0
          shuffleglide = 40-shuffleglide
        }
      }else{
                if(holdtime1>Math.PI&&holdtime1<Math.PI*2){
          audio.currentTime = 9999999
        }
        
        holdtime1/=2;
        
      }
      //console.log(holdtime1+", x:"+mx+", y:"+my)
      
      ctx.strokeStyle = "rgba(255,255,255,1)"
      ctx.lineCap='butt'
      ctx.beginPath();
      ctx.arc(WIDTH-50,HEIGHT-50,-Math.pow(holdtime1,2)+(holdtime1*15),0,holdtime1)
      ctx.stroke()
      ctx.strokeStyle = "rgba(255,255,255,0.5)"
      ctx.lineWidth = 1;
      ctx.font = "15px Verdana"
      //ctx.strokeText("skip",WIDTH-70,HEIGHT-85)
      if (holdtime1>Math.PI&&holdtime1<Math.PI*2){
        ctx.strokeStyle = "rgba(255,255,255,1)"
      ctx.lineWidth = 2;
      ctx.font = "15px Verdana"
      ctx.strokeText("skip",WIDTH-70,HEIGHT-85)
        
        ctx.strokeStyle = "rgba(255,255,255,0.5)"
      ctx.lineWidth = 1;
      ctx.font = "15px Verdana"
      ctx.strokeText("shuffle",WIDTH-80,HEIGHT-105)
        
        
      }
      //console.log(all/200000)
      ctx.fillStyle = "rgba(255,255,255,"+(all/75000-1.5)+")"
      ctx.fillRect(0,0,WIDTH,HEIGHT)
      //var immgg = ctx.getImageData(0,0,WIDTH,HEIGHT)
      //ctx2.putImageData(immgg,0,0)
      
      
      shuffle+=(shuffleglide-shuffle)/10
    }

    audio.play();
    renderFrame();
  };
  audio.onended = function(){
    selected++;
    if (selected>=files.length){
      selected = 0
    }
    if (shuffleglide>0){
      selected = Math.floor(Math.random()*(files.length))
    }
    audio.src = URL.createObjectURL(files[selected]);
    audio.currentTime = 0;
    audio.load();
    audio.play()
  }
};
