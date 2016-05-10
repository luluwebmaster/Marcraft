//Liste des scripts
listScripts = [
	"functions",
	"vars",
	"actions"
];
//On compte le nombre de scripts
lengthScripts = listScripts.length;
//On continu que s'il y a au moin un script
if(lengthScripts > 0)
{
	//On charge les scripts avec une boucle
	for(i=0;i<lengthScripts;i++)
	{
		$.getScript('scripts/'+listScripts[i]+'.js');
	}
}