//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const questions= quiz.sort(function(){
    return 0.5 - Math.random();
});

// jika tombol startQuiz diklik
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //menampilkan info box
}

// jika tombol exitQuiz diklik
exit_btn.onclick = ()=>{
    window.location.assign("index.html"); //menyembunyikan info box
}

// jika tombol continueQuiz diklik
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //menyembunyikan info box
    quiz_box.classList.add("activeQuiz"); //menampilkan quiz box
    showQuetions(0); //memanggil fungsi showQestions
    queCounter(0); //meneruskan 1 parameter ke queCounter
    startTimer(4); //memanggil fungsi startTimer
    startTimerLine(0); //memanggil fungsi startTimerLine
}

let timeValue =  5;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//jika tombol restartQuiz diklik
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //menampilkan quiz box
    result_box.classList.remove("activeResult"); //menyembunyikan result box
    timeValue = 5; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //memanggil fungsi showQestions
    queCounter(que_numb); //meneruskan nilai que_numb ke queCounter
    clearInterval(counter); //menghentikan counter
    clearInterval(counterLine); //menghentikan counterLine
    startTimer(timeValue); //memanggil fungsi startTimer
    startTimerLine(widthValue); //memanggil fungsi startTimerLine
    timeText.textContent = "Sisa Waktu"; //mengubah text dari timeText ke Time Left
    next_btn.classList.remove("show"); //menyembunyikan tombol next
}

// jika tombol quitQuiz di klik
quit_quiz.onclick = ()=>{
    window.location.assign("index.html"); //memuat ulang jendela saat ini.
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// jika tombol Next di klik
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //jika jumlah pertanyaan kurang dari total panjang pertanyaan
        que_count++; //menambah nilai que_count
        que_numb++; //menambah nilai que_numb
        showQuetions(que_count); //memanggil fungsi showQestions
        queCounter(que_numb); //meneruskan nilai que_numb ke queCounter
        clearInterval(counter); //menghentikan counter
        clearInterval(counterLine); //menghentikan counterLine
        startTimer(timeValue); //memanggil fungsi startTimer
        startTimerLine(widthValue); //memanggil fungsi startTimerLine
        timeText.textContent = "Sisa Waktu"; //mengubah timeText ke Time Left
        next_btn.classList.remove("show"); //menyembunyikan tombol 
    }else{
        clearInterval(counter); //menghentikan counter
        clearInterval(counterLine); //menghentikan counterLine
        showResult(); //memanggil fungsi showResult
    }
}

// menampilkan pertanyaan dan opsi dari array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //membuat tag span dan div baru untuk pertanyaan dan opsi serta meneruskan nilai menggunakan indeks array
    let que_tag = '<span>'+ questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //menambahkan tag span baru di dalam que_tag
    option_list.innerHTML = option_tag; //menambahkan tag div baru di dalam option_tag
    
    const option = option_list.querySelectorAll(".option");

    // mengatur onclick attribute untuk semua opsi yang tersedia 
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// membuat tag div baru untuk ikon
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//jika pengguna mengklik opsi
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //mendapatkan opsi yang dipilih pengguna
    let correcAns = questions[que_count].answer; //mendapatkan jawaban yang benar dari array
    const allOptions = option_list.children.length; //mendapatkan semua item opsi
    
    if(userAns == correcAns){ //jika opsi yang dipilih pengguna sama dengan jawaban yang benar dari array
        userScore += 1; //meningkatkan nilai skor dengan 1
        answer.classList.add("correct"); //menambahkan warna hijau untuk mengoreksi opsi yang dipilih
        answer.insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang untuk memperbaiki opsi yang dipilih
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //menambahkan warna merah untuk memperbaiki opsi yang dipilih
        answer.insertAdjacentHTML("beforeend", crossIconTag); //menambahkan ikon silang untuk memperbaiki opsi yang dipilih
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //jika ada opsi yang cocok dengan jawaban array
                option_list.children[i].setAttribute("class", "option correct"); //menambahkan warna hijau ke opsi yang cocok
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //menambahkan ikon centang ke opsi yang cocok
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //setelah pengguna memilih opsi, lalu nonaktifkan semua opsi
    }
    next_btn.classList.add("show"); //tampilkan tombol berikutnya jika pengguna memilih opsi apa pun
}

function showResult(){
    info_box.classList.remove("activeInfo"); //sembunyikan kotak info
    quiz_box.classList.remove("activeQuiz"); //sembunyikan quiz box
    result_box.classList.add("activeResult"); //manmpilkan result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 20){ //jika skor pengguna lebih dari 20
        //membuat tag span baru dan meneruskan nomor skor pengguna dan total nomor pertanyaan
        let scoreTag = '<span>Selamat! 🎉, Kamu mendapatkan score <p>'+ userScore +'</p>/<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag+'<br> NILAI : '+userScore*4+'/100';  //adding new span tag inside score_Text
    }
    else if(userScore > 15){ //jika skor pengguna lebih dari 15
        let scoreTag = '<span>nice 😎, Kamu mendapatkan score <p>'+ userScore +'</p>/<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag+'<br> NILAI : '+userScore*4+'/100';
    }
    else{ //jika skor pengguna kurang dari 15
        let scoreTag = '<span>Maaf 😐, kamu mendapatkan score <p>'+ userScore +'</p>/<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag+'<br> NILAI : '+userScore*4+'/100';
    }
}

function startTimer(time){
    counter = setInterval(timer, 1500);
    function timer(){
        timeCount.textContent = time; //mengubah nilai timeCount dengan nilai waktu
        time--; //mengurangi nilai waktu
        if(time < 9){ //jika timer kurang dari 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //menmabahkan "0" sebelum nilai waktu
        }
        if(time < 0){ //jika timer kurang dari 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Waktu Habis"; //ubah teks waktu menjadi waktu habis
            const allOptions = option_list.children.length; //mendapatkan semua item opsi
            let correcAns = questions[que_count].answer; //mendapatkan jawaban yang benar dari array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //jika ada opsi yang cocok dengan jawaban array
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Waktu Habis: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //setelah pengguna memilih opsi, lalu nonaktifkan semua opsi
            }
            next_btn.classList.add("show"); //tampilkan tombol berikutnya jika pengguna memilih opsi apa pun
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 18);
    function timer(){
        time += 1; //meningkatkan nilai waktu dengan 1
        time_line.style.width = time + "px"; //meningkatkan lebar time_line dengan px dengan nilai waktu
        if(time > 500){ //jika nilai waktu lebih besar dari 500
            clearInterval(counterLine); //clear counterLine
        }
    }
}
15
function queCounter(index){
    //membuat tag span baru dan meneruskan nomor pertanyaan dan total pertanyaan
    let totalQueCounTag = '<span><p>'+ index +'</p> DARI <p>'+ questions.length +'</p>SOAL</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //menambahkan tag span baru di dalam bottom_ques_counter
}
