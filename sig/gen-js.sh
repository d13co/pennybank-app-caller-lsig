#!/bin/bash

echo "const b64 = '$(cat sig.teal.tok | base64 -w 0)'";
