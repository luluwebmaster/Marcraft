//Fonction pour set des actions sur les touches quand on APPUIE dessus
function actionUpKey(codeKey)
{
	// alert(codeKey)
	//On set les differentes actions à effectuer
	switch(codeKey)
	{
		//Touche pour sauter
		case 32:
			perso['jump'] = true;
		break;
		//Touche pour avancer
		case 39:
			game_background['start'] = true;
		break;
		//Touche pour démarrer le jeu
		case 13:
			if(gameStarted == false && gameLoad == true)
			{
				startGame();
			}
		break;
	}
}
//Fonction pour set des actions sur les touches quand on APPUIE dessus
function actionDownKey(codeKey)
{
	//On set les differentes actions à effectuer
	switch(codeKey)
	{
		//Touche pour sauter
		case 32:
			// perso['jump'] = false;
		break;
		//Touche pour avancer
		case 39:
			game_background['start'] = false;
			$('.gf-perso').css('background-image', "url('imgs/perso_9.png')");
		break;
	}
}
//Fonction pour démarrer le jeu
function startGame()
{
	gameStarted = true;
	$('.gf-start').css('display', 'none');
	$('.gf-stats').css('display', 'block');
	perso['start'] = true;
}
//Fonction quand on est mort
function deathPerso()
{
	//On reset les platformes
	$('.gf-plats').html('<div class="gfp-plat gfp-plat_start" style="background-image:url(\'imgs/grass_1.png\');width:300px;top:300px;"></div>');
	//On set le perso
	$('.gf-perso').css('height', perso['height']+'px');
	$('.gf-perso').css('width', perso['width']+'px');
	var topPerso = ($('.g-frame').height() / 2) + ((perso['width'] / 2) - perso['height']);
	$('.gf-perso').css('top', topPerso+'px');
	$('.gf-perso').css('left', (($('.g-frame').width() / 2) - (perso['width'] / 2))+'px');
	$('.gf-perso').css('background-image', "url('imgs/perso_9.png')");
	$('.gfp-plat_start').css('top', (topPerso + perso['height'])+'px');
	$('.gfp-plat_start').css('left', (($('.g-frame').width() / 2) - ($('.gfp-plat_start').width() / 2))+'px');
	//On set le background
	$('.gf-background').html('<img src="imgs/background.png" class="gfb-img gfb-1"/><img src="imgs/background.png" class="gfb-img gfb-2"/>');
	//On set l'accueil du jeu
	$('.gf-start').css('display', 'block');
	$('.gf-stats').css('display', 'none');
	//On reset les infos
	perso['nb_plats'] = 0;
	perso['nb_points'] = 0;
	perso['nb_jumps'] = 0;
	$('.gfs-time').html('0');
	perso['jump'] = false;
	game_background['start'] = false;
	gameStarted = false;
}
//Fonction de préchargement d'image reprise ici : http://stackoverflow.com/questions/476679/preloading-images-with-jquery
var preloadPictures = function(pictureUrls, callback) {
    var i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () {                               
                if (++loaded == pictureUrls.length && callback) {
                    callback();
                }
            };

            // Use the following callback methods to debug
            // in case of an unexpected behavior.
            img.onerror = function () {};
            img.onabort = function () {};

            img.src = 'imgs/'+src;
        } (new Image(), pictureUrls[i]));
    }
};