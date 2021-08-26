function promisedDivision(n1, n2) {
  if (n2 === 0) {
    return Promise.reject(new Error('Cannot divide by 0'));
  } else {
    return Promise.resolve(n1 / n2);
  }
}

async function divideWithAwait(a: number, b: number) {
  try {
    return await promisedDivision(a, b);
  }catch (e) {
    return "divideWithAwait catch the Error!"
  }
}

async function divideWithoutAwait(a:number, b: number) {
  try {
    return promisedDivision(a, b);
  }catch (e) {
    return "divideWithoutAwait catch the Error!"
  }
}

/**
 * Promiseを返す関数：returnにawaitをつけるかどうかで挙動が異なる
 * awaitをつけないとpromiseDivision()のPromiseがrejectされずに、そのままPromiseが渡されるため
 * s.a: https://dmitripavlutin.com/return-await-promise-javascript/
 */
test("正しく割り算ができる", async () => {
  expect(await divideWithAwait(6, 2)).toBe(3)
  expect(await divideWithoutAwait(6, 2)).toBe(3)
})

test("return await Promiseするとrejectされた結果catchされた内容が返される", async () => {
  await expect(divideWithAwait(6, 0)).resolves.toMatch("divideWithAwait catch the Error!")
})

test("return Promiseするとcatchされた内容ではなく、Promiseがrejectされないまま返される", async () => {
  await expect(divideWithoutAwait(6, 0)).rejects.toThrowError()
})
