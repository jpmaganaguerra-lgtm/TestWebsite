#!/bin/sh
# Uso: sh scripts/set-domain.sh https://www.tudominio.com
# Reemplaza el dominio de ejemplo en todo el sitio.
[ -z "$1" ] && echo "Falta el dominio" && exit 1
grep -rl "https://www.REEMPLAZAR-DOMINIO.com" . --include=*.html --include=*.xml --include=*.txt --include=*.js --include=*.md | xargs sed -i.bak "s#https://www.REEMPLAZAR-DOMINIO.com#$1#g"
find . -name "*.bak" -delete
echo "Dominio actualizado a $1"
