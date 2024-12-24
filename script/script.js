document.addEventListener("DOMContentLoaded" , ()=>{
	
	/* 1) 메인 메뉴에 마우스를 대면 모든 하위메뉴가 서서히 아래로 슬라이드 되면서 나타나고,
	      메뉴영역에서 마우스를 떼면 모든 하위메뉴는 서서히 위로 슬라이드 되면서 사라진다. */ 
	const mainmenu = document.querySelectorAll('a.mainMenu');
	const submenu = document.querySelectorAll('nav.submenu');
	const whiteBg = document.querySelector('header>div'); //흰배경내려온다
	const menu = document.getElementById('menu');

	//모바일화면
	const phone = document.getElementsByClassName('phone')[0];
	if( window.innerWidth <= 850 ){				
		phone.addEventListener('click' , ()=>{
			phone.textContent = 'close';
			menu.style.left = 0;
		});
	}


	mainmenu.forEach( i =>{
		i.addEventListener('mouseenter' , ()=>{
			if(window.innerWidth> 850){
				whiteBg.style.height='320px'; 				
			}
			submenu.forEach( j => j.style.height='150px' );		
			mainmenu.forEach( x =>  x.classList.remove('act')  );//모든 act 삭제
			i.classList.add('act');//해당메뉴만 act추가
		});
	});
	menu.addEventListener('mouseleave' , ()=>{
		if(window.innerWidth> 850){
			whiteBg.style.height='200px'; 
		}		
		submenu.forEach( j => j.style.height= 0 );
		mainmenu.forEach( i =>  i.classList.remove('act')  );//모든 act 삭제
	});
	
	
	// 2)하위메뉴에 마우스 오버시 해당 메인 메뉴의 활성화는 유지되며, 메뉴영역을 벗어나면 활성화는 해제된다.
		submenu.forEach( i =>{
		i.addEventListener('mouseenter' , ()=>{
			mainmenu.forEach( j =>  j.classList.remove('act')  );//모든 act 삭제
			i.previousElementSibling.classList.add('act');
			if( window.innerWidth > 850 ){				
				whiteBg.style.height='200px';
			}
			if( window.innerWidth <= 850) {
				phone.textContent = 'menu';
				menu.style.left = '-100vw';
			}
			submenu.forEach( j => j.style.height= 0 );		
		});
	});
	submenu.forEach( i =>{
		i.addEventListener('mouseleave' , ()=>{
			mainmenu.forEach( j =>  j.classList.remove('act')  );//모든 act 삭제
		});
	});
		
	
	/* 3) 큰 배너형 이미지 3장은 자동으로 오른쪽 방향을 향해 한 장씩 슬라이드된다. 
     (페이지를 빠져나오기 전까지 반복 루프)  */
	const slide = document.getElementById('slide');
	const circle = document.querySelectorAll("#circle div");
	const imgWidth = slide.querySelector('img').clientWidth;
	slide.style.left = imgWidth * (-1) + "px";//이미지 한개 넓이 만큼 왼쪽밖으로 나가 있음.	
	
	const callback = ()=>{
		slide.style.transition = 'none';
		slide.style.left = imgWidth * (-1) + "px";
		slide.prepend(  slide.lastElementChild );
	}
	let r = 0;
	const toRight = ()=> {
		r++;
		if( r===3) r = 0;
		circle.forEach( i=> i.classList.remove('red') );
		circle[r].classList.add('red');
		slide.style.transition = 'left 1s';
		slide.style.left = 0;
		setTimeout( callback , 1000 );
	} 	
	
	setInterval( toRight , 2700 );

	/* 4) 공지사항 목록에서 텍스트 항목을 클릭하면 팝업모달이 서서히 나타나고,
	   [닫기]버튼을 클릭하면 팝업모달은 서서히 사라진다.  */
	const notice_a = document.querySelectorAll('#notice a');
	const popup = document.getElementById('popup');
	
	notice_a.forEach( i =>{
		i.addEventListener( 'click' ,()=> {
			popup.style.opacity = 1 ;
			popup.style.zIndex = 1 ;
		});
	});

	popup.querySelector('button').addEventListener('click' , ()=>  {
		popup.style.opacity = 0  ;
		popup.style.zIndex =  -1 ;
	});
	
});/////////////////////////////////all end