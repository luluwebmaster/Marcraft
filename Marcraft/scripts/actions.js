//On bloque le clic droit sur les images
$(document).on("contextmenu", "img, .gf-perso, .gf-plats, .gf-game, .gf-start", function(e){
   return false;
});
//On set le perso
$('.gf-perso').css('height', perso['height']+'px');
$('.gf-perso').css('width', perso['width']+'px');
var topPerso = ($('.g-frame').height() / 2) + ((perso['width'] / 2) - perso['height']);
$('.gf-perso').css('top', topPerso+'px');
$('.gf-perso').css('left', (($('.g-frame').width() / 2) - (perso['width'] / 2))+'px');
$('.gf-perso').css('background-image', "url('imgs/perso_9.png')");
$('.gfp-plat_start').css('top', (topPerso + perso['height'])+'px');
$('.gfp-plat_start').css('left', (($('.g-frame').width() / 2) - ($('.gfp-plat_start').width() / 2))+'px');
//Actions à interval
setInterval(function (){
	//Si Le jeu est lancé
	if(gameStarted == true && gameLoad == true)
	{
		//On fait avancer le background si besoin
		if(game_background['start'] == true)
		{
			//On fait avancer le background
			if(parseFloat($('.gfb-2').css('left')) <= 0)
			{
				$('.gfb-1').remove();
				$('.gfb-2').addClass('gfb-1');
				$('.gfb-2').removeClass('gfb-2');
				$('.gf-background').append('<img src="imgs/background.png" class="gfb-img gfb-2"/>');
			}
			var getPos = {
				1 : parseFloat($('.gfb-1').css('left')),
				2 : parseFloat($('.gfb-1').css('left')) + $('.gfb-2').width()
			};
			var netPos = {};
			netPos[1] = getPos[1] - game_background['pixel_av'];
			netPos[2] = getPos[2] - game_background['pixel_av'];
			//On fais avancer les plateformes
			$('.gfp-plat').each(function (){
				var newElementPos = parseFloat($(this).css('left')) - game_background['pixel_av'];
				if((newElementPos + $(this).width()) > 0)
				{
					$(this).css('left', newElementPos+'px');
				}
				else
				{
					$(this).remove();
				}
			});
			//On fait avancer le background
			$('.gfb-1').css('left', netPos[1]+'px');
			$('.gfb-2').css('left', netPos[2]+'px');
			//On fais bouger l'anim du perso
			$('.gf-perso').css('background-image', "url('imgs/perso_"+perso['perso_last_pos']+".png')");
			if(perso['perso_last_time'] > 16)
			{
				perso['perso_last_time'] = 0;
				var persoNewAnim = perso['perso_last_pos'] + 1;
				if(persoNewAnim > 9)
				{
					persoNewAnim = 1;
				}
				perso['perso_last_pos'] = persoNewAnim;
			}
			perso['perso_last_time']++;
		}
		//On gère le perso
		if(perso['start'] == true)
		{
			if(perso['jump'] == true && onBlock == true)
			{
				if(perso['jump_height'] <= perso['jump_max'])
				{
					var newPos = parseFloat($('.gf-perso').css('top')) - perso['jump_pixel'];
					perso['jump_height'] = perso['jump_height'] + perso['jump_pixel'];
					$('.gf-perso').css('top', newPos+'px');
				}
				else
				{
					perso['jump'] = false;
					setTimeout(function (){
						perso['jump_height'] = 0;
						perso['nb_jumps'] = perso['nb_jumps'] + 1;
					}, 100);
				}
			}
			else if(perso['jump'] == false)
			{
				onBlock = false;
				var newPos = parseFloat($('.gf-perso').css('top')) + perso['perso_pixel'];
				$('.gfp-plat').each(function (){
					var topBlock = parseFloat($(this).css('top'));
					var leftBlock = parseFloat($(this).css('left'));
					var leftPerso = parseFloat($('.gf-perso').css('left'));
					if((newPos + perso['height']) > topBlock && (newPos + perso['height']) < (topBlock + $(this).width()) && leftPerso < (leftBlock + $(this).width()) && (leftPerso + perso['width']) > leftBlock)
					{
						onBlock = true;
					}
				});
				//On verifie que le perso n'est pas sur un block
				if(onBlock == false)
				{
					$('.gf-perso').css('top', newPos+'px');
					if((newPos + (perso['height'] / 2 )) > $('.g-frame').height())
					{
						alert('Vous êtes mort ! :(\n\nVos stats : \n- Nombre de platformes : '+perso['nb_plats']+'\n- Nombre de points : '+perso['nb_points']+'\n- Nombre de jumps : '+perso['nb_jumps']);
						deathPerso();
					}
				}
				//On verifie que le perso ne dépasse pas un block en negatif
				var bloquedPerso = false;
				$('.gfp-plat').each(function (){
					var topPerso = parseFloat($('.gf-perso').css('top'));
					var leftPerso = parseFloat($('.gf-perso').css('left'));
					var topBlock = parseFloat($(this).css('top'));
					var leftBlock = parseFloat($(this).css('left'));
					if((leftPerso + perso['width']) > leftBlock && leftPerso < (leftBlock + $(this).width()) && (topPerso + perso['height']) > topBlock)
					{
						bloquedPerso = true;
					}
				});
				if(bloquedPerso == true)
				{
					game_background['start'] = false;
					$('.gf-perso').css('background-image', "url('imgs/perso_9.png')");
					$('.gfp-plat').each(function (){
						var leftBlock = (parseFloat($(this).css('left')) + game_background['pixel_av']);
						$(this).css('left', leftBlock+"px");
					});
					$('.gf-background img').each(function (){
						var leftBlock = (parseFloat($(this).css('left')) + game_background['pixel_av']);
						$(this).css('left', leftBlock+"px");
					});
				}
			}
			else
			{
				perso['jump'] = false;
			}
		}
		//On fait spawn des platformes randoms
		var widthGame = $('.g-frame').width();
		var widthPlat = parseFloat($('.gfp-plat').last().css('left')) + $('.gfp-plat').last().width();
		var widthTest = widthGame - widthPlat;
		if(widthTest > 0)
		{
			var randomPosePlat = Math.random() * (100 - 60) + 60;
			var newPosLeft = widthPlat + randomPosePlat;
			var randomPos = Math.floor(Math.random() * 91);
			var randomVal = Math.floor(Math.random() * 2);
			if(randomVal == 1)
			{
				var newPosTop = parseFloat($('.gfp-plat').last().css('top')) - randomPos ;
			}
			else if(randomVal == 0)
			{
				var newPosTop = parseFloat($('.gfp-plat').last().css('top')) + randomPos;
			}
			var randomSize = Math.random() * (300 - 60) + 60;
			var randomBackground = Math.floor(Math.random() * 4);
			if(newPosTop < ($('.g-frame').height() - 10 ) && newPosTop > 200)
			{
				$('.gf-plats').append('<div class="gfp-plat" style="background-image:url(\'imgs/'+listeImgsPlos[randomBackground]+'.png\');width:'+randomSize+'px;top:'+newPosTop+'px;left:'+newPosLeft+'px;"></div>');
				perso['nb_plats'] = perso['nb_plats'] + 1;
				perso['nb_points'] = perso['nb_points'] + Math.round(randomSize / 10);
			}
		}
		//On set les statistiques
		$('.gfs-plats').html(perso['nb_plats']);
		//On récupère la la dernière valeur
		var lastValue = parseFloat($('.gfs-points').html());
		newValue = 0;
		if(lastValue > 0)
		{
			if(lastValue < perso['nb_points'])
			{
				newValue = lastValue + 1;
			}
			else
			{
				newValue = perso['nb_points'];
			}
		}
		else
		{
			newValue = perso['nb_points'];
		}
		$('.gfs-points').html(newValue);
		$('.gfs-jumps').html(perso['nb_jumps']);
	}
	//On test si toutes les images sont chargés
	if(gameLoad == true)
	{
		$('.gf-load').css('display', 'none');
	}
}, game_background['speed']);
//Pn preload les images
preloadPictures([
	"loading.gif",
	"background.png",
	"grass_1.png",
	"grass_2.png",
	"grass_3.png",
	"grass_4.png",
	"perso_1.png",
	"perso_2.png",
	"perso_3.png",
	"perso_4.png",
	"perso_5.png",
	"perso_6.png",
	"perso_7.png",
	"perso_8.png",
	"perso_9.png"
], function (){
	gameLoad = true;
});
//On fait avancer le timer si le jeu est lancé
setInterval(function (){
	if(gameStarted == true && gameLoad == true)
	{
		var getTime = (parseInt($('.gfs-time').html()) + 1);
		$('.gfs-time').html(getTime);
	}
}, 1000);
//Quand la page est chargé
$(document).ready(function (){
	//On écoute les touches
	//Quand on appuie sur une touche
	$('body').keydown(function (e){
		actionUpKey(e.keyCode);
	});
	//Quand on appuie plus sur une touche
	$('body').keyup(function (e){
		actionDownKey(e.keyCode);
	});
});