url="https://ondemand.npr.org/anon.npr-mp3/npr/fl/2016/10/";
filebase="20161011_fl_a";

artist="American Football";
album="American Football (LP2)";
year="2016";
total="9";
declare -a tracks=(
	"Where Are We Now?" 
	"My Instincts Are The Enemy" 
	"Home Is Where The Haunt Is" 
	"Born To Lose" 
	"I've Been So Lost For So Long" 
	"Give Me The Gun" 
	"I Need a Drink (Or Two or Three)" 
	"Desire Gets in the Way" 
	"Everyong Is Dressed Up" 
)

for i in `seq 01 $total`;
do 
	curl -OL $url$filebase`printf "%02d" $i`.mp3;
	id3tag --artist="$artist" --album="$album" --year=$year --track=$i --total=$total --song="${tracks[$i-1]}" $filebase`printf "%02d" $i`.mp3;
done;
