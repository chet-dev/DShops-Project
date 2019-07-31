#!/bin/bash
####################################
JsonInputFile=$1
BaseInputFileName=$(basename "$1")
JsOutputFile=$(echo "$BaseInputFileName" | cut -f 1 -d '.')'.abi.js'
line1='const contract = {'
line2='address : '
address=$(cat $JsonInputFile | jq '.networks' | jq .[] | jq '.address')','
line3='abi : '
abi=$(cat $JsonInputFile | jq '.abi')
line4='}'
line5='export default contract'

(echo $line1 &&
echo $line2 $address &&
echo $line3 $abi &&
echo $line4 &&
echo $line5) > $JsOutputFile
echo "output to current dir : "$JsOutputFile


