url="https://ondemand.npr.org/anon.npr-mp3/npr/fl/2016/09/";
filebase="20160914_fl_rs";

artist="Ryuichi Sakamoto";
album="Nagasaki: Memories Of My Son";
year="2016";
total="28";

for i in `seq 01 $total`;
do 
	curl -OL $url$filebase`printf "%02d" $i`.mp3;
	id3tag --artist="$artist" --album="$album" --year=$year --track=$i --total=$total $filebase`printf "%02d" $i`.mp3;
done;
