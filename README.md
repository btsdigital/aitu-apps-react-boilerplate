# React Boilerplate

React приложение, показывает как использовать библиотеку @btsd/aitu-bridge для управления приложением в Aitu Apps

## Документация

http://docs.aitu.io/

## Установка

```bash
npm install
npm run start
```
открыть в браузере http://localhost:3000/

## Progressive Web Apps

Приложение настроено на работу в качестве [PWA](https://web.dev/what-are-pwas/) и может быть доступным при полном отсутсвии соединения!
Подробнее про настройку и конфигурацию PWA можно прочитать [здесь](https://create-react-app.dev/docs/making-a-progressive-web-app/).

### ⚠️⚠️⚠️

Функциональность PWA доступна только после продакшен сборки приложения (`npm run build`) и только по `https` протоколу или на локальном домене `localhost`. 
Мы также **крайне рекомендуем** использовать режим инкогнито в браузере для тестирования PWA возможностей во избежание возможных осложнений с кешем вашего браузера.
