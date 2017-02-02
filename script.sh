url="https://ondemand.npr.org/anon.npr-mp3/npr/fl/2017/01/";
filebase="20170131_fl_td";

artist="Teen Daze";
album="Themes for Dying Earth";
year="2017";
total="10";
declare -a tracks=(
	"Cycle"
	"Dream City"
	"Becoming"
	"Lost (feat. Nadia Hulett)"
	"Cherry Blossoms (feat. Dustin Wong)"
	"First Rain (feat. S. Carey)"
	"Rising (feat. Sound of Ceres)"
	"Anew (feat. Jon Anderson)"
	"Water in Heaven"
	"Breath"
)

for i in `seq 01 $total`;
do
	curl -OL $url$filebase`printf $i`.mp3;
	id3tag --artist="$artist" --album="$album" --year=$year --track=$i --total=$total --song="${tracks[$i-1]}" $filebase`printf $i`.mp3;
done;
