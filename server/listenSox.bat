set DATEANDTIME=%DATE:~0,2%_%DATE:~3,3%_%DATE:~7,2%_%TIME:~1,1%_%TIME:~3,2%_%TIME:~6,2%
"C:\Program Files (x86)\sox-14-4-0\sox.exe" -r 16000 -e signed -b 16 -c 2 -d %DATEANDTIME%.flac silence 1 1 1% 1 .5 1%  trim 0 4
mv %DATEANDTIME%.flac ./files/