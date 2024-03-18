package main

import (
	"fmt"
	"log"

	"github.com/clarkhao/go-func/cp"
	"github.com/clarkhao/go-func/json"
)

func main() {
	defaultDir := "C:\\Users\\clark\\Documents\\codes\\ts\\ts-function"
	err := cp.CopyOne(defaultDir+"/package.json", defaultDir+"/lib/cjs/package.json")
	if err != nil {
		log.Panic(err)
	}
	err = cp.CopyOne(defaultDir+"/package.json", defaultDir+"/lib/mjs/package.json")
	if err != nil {
		log.Panic(err)
	}
	count, err := json.AddItems(defaultDir+"/lib/cjs/package.json", defaultDir+"/build/common.json")
	if err != nil {
		log.Panic(err)
	} else {
		fmt.Printf("add %v item\n", count)
	}
	count, err = json.AddItems(defaultDir+"/lib/mjs/package.json", defaultDir+"/build/module.json")
	if err != nil {
		log.Panic(err)
	} else {
		fmt.Printf("add %v item", count)
	}
}
