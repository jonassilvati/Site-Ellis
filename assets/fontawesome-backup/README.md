# Backup Font Awesome Pro

Cópia de segurança dos arquivos completos do Font Awesome Pro, fora de `public/`.

**Não é publicado no site** — não afeta o desempenho em produção.

## Conteúdo

- `webfonts/` — todas as webfonts (36 arquivos, .woff2 e .ttf)
- `fontawesome/` — CSS e JS completos (`all.min.css`, `all.min.js`, `sharp-regular.min.css`, `sharp-regular.min.js`)

## Uso em produção

O site usa apenas:

- `public/fontawesome/icons-subset.css`
- `public/webfonts/fa-light-300.woff2`
- `public/webfonts/fa-regular-400.woff2`
- `public/webfonts/fa-solid-900.woff2`
- `public/webfonts/fa-brands-400.woff2`
- `public/webfonts/fa-sharp-regular-400.woff2`

## Restaurar um arquivo

```bash
cp assets/fontawesome-backup/webfonts/<arquivo> public/webfonts/
```

Para voltar ao pacote completo no site (não recomendado para performance):

```bash
cp assets/fontawesome-backup/fontawesome/all.min.css public/fontawesome/
cp assets/fontawesome-backup/webfonts/* public/webfonts/
```

Depois atualize `nuxt.config.ts` para referenciar os arquivos restaurados.
