# «Айзере 2021» — лендинг ясли-сада

Next.js 15 + TypeScript + Tailwind CSS 4. Готов к размещению на Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run lint && npm run typecheck
```

## Структура

- `src/config/site.ts` — контакты, адрес, ссылки, `documentsUrl`, `mapEmbedUrl`, `mapUrl`.
- `src/i18n/translations.ts` — все тексты на казахском и русском (казахский по умолчанию).
- `src/components/website/` — версия для компьютера (≥ 1024 px).
- `src/components/mobile-website/` — версия для телефона и планшета (< 1024 px).
- `src/components/shared/` — общие элементы: кнопки, галерея и просмотрщик, декор, контакты, футер.
- `src/lib/images.ts` — единый список фотографий, который строится из `public/images`.

## Фотографии

Положите файлы в `public/images` (png, jpg, jpeg, webp, avif) и пересоберите сайт:

- `main-page.*` — главный экран;
- `main-page2.*` — раздел «О садике»;
- `image1.*`, `image2.*`, `image3.*`, … — галерея (в порядке номеров).

Пока фото нет, сайт показывает нейтральные иллюстрации (не выдавая их за фото садика).

## Документы и карта 2ГИС

В `src/config/site.ts`:

- `documentsUrl` — ссылка на папку с документами. Пока `null`, кнопка неактивна («Скоро будет доступно»).
- `mapEmbedUrl` — ссылка для встраивания карты 2ГИС (src iframe), `mapUrl` — ссылка на карточку в 2ГИС.
  Пока `mapEmbedUrl` равен `null`, вместо карты показывается карточка с адресом.

Для правильных canonical-ссылок в SEO задайте переменную окружения `NEXT_PUBLIC_SITE_URL` (адрес сайта на Vercel или своём домене).
