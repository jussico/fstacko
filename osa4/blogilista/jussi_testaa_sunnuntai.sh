#!/bin/bash

# kaikki tapanin testit
#npm t -- tests/tapani.super.test.js

# tietty testi
#npm t -- -t '4.13, deletion of a blog'

#npm t -- -t '4.14, updating a blog'

# sunnuntaitestit
npm t -- tests/sunnuntai.test.js

