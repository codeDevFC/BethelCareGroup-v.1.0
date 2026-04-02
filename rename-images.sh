#!/bin/bash
# Move to the gallery folder
cd public/images/gallery 2>/dev/null || exit
counter=1
for i in *.{jpg,jpeg,png}; do
    if [ -f "$i" ]; then
        new_name=$(printf "Bcg-%02d.jpg" $counter)
        mv "$i" "$new_name"
        echo "Renamed $i to $new_name"
        ((counter++))
    fi
done
