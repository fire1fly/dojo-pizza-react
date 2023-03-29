import React from 'react';

import { ErrorBlock } from "../components";

export function ErrorPage() {
  return (
    <ErrorBlock
      title={"Ошибка! Страница не найдена"}
      linkRoute={"/"}
      linkLabel={"Вернуться на главную"}
    />
  )
}
