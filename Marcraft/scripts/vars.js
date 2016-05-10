//Variable d'avancement du background
game_background = {
	"start" : false,
	"speed" : 1,
	"pixel_av" : 0.8
};
//Variable du perso
perso = {
	"start" : false,
	"height" : 100,
	"width" : 60,
	"perso_pixel" : 1.4,
	"perso_last_time" : 0,
	"perso_last_pos" : 9,
	"jump" : false,
	"jump_height" : 0,
	"jump_max" : 100,
	"jump_pixel" : 1.4,
	"nb_plats" : 0,
	"nb_points" : 0,
	"nb_jumps" : 0
}
//Liste des images pour les "plots"
listeImgsPlos = ["grass_1", "grass_2", "grass_3", "grass_4"];
//Variable pour savoir si le jeu est démarré
gameStarted = false;
//Variable pour tester si les jeu est bien chargé
gameLoad = false;