### Hexlet tests and linter status:
[![Actions Status](https://github.com/AlexTrava/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/AlexTrava/frontend-project-46/actions)
### Codeclimate Maintainability and Test Coverage:
[![Maintainability](https://api.codeclimate.com/v1/badges/1b814de4d5e630cb12f8/maintainability)](https://codeclimate.com/github/AlexTrava/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1b814de4d5e630cb12f8/test_coverage)](https://codeclimate.com/github/AlexTrava/frontend-project-46/test_coverage)
### Tests and linter status:
[![Test-and-lint](https://github.com/AlexTrava/frontend-project-46/actions/workflows/check.yml/badge.svg)](https://github.com/AlexTrava/frontend-project-46/actions/workflows/check.yml)

## Вычислитель отличий.

### Описание:

+ Программа сравнивает два  файла с расширениями .json, .yml, .yaml.
+ Cli-утилита, которая принимает два аргумента — путь до первого файла, путь до второго файла.
+ Результат сравнения файлов можно вывести в разных форматах (plain text, stylish, json).

### Системные требования и установка:

+ Версия Node.js - 17+

- Склонируйте репозиторий:
```
git clone https://github.com/AlexTrava/frontend-project-46
```

- Установите зависимости:
```
make install
npm link
```

### Вызов справки:
```
gendiff -h
```
![image](https://user-images.githubusercontent.com/106436234/210780652-5b06130e-0af9-4825-b536-14a671fb0a72.png)

### Пример работы со стандартным форматером Stylish:
```
gendiff __fixtures__/file1.json __fixtures__/file2.yaml
```
![image](https://user-images.githubusercontent.com/106436234/210781018-b61558b4-25d8-4fe6-b8a8-d3251e366ef4.png)

### Пример работы с форматером Plain:
```
gendiff -f plain __fixtures__/file1.json __fixtures__/file2.yaml
```
![image](https://user-images.githubusercontent.com/106436234/210781156-96b31491-3a6b-49c3-bda7-bd6044f2c22c.png)

### Пример работы с форматером JSON:
```
gendiff -f json __fixtures__/file1.json __fixtures__/file2.yaml
```
![image](https://user-images.githubusercontent.com/106436234/210781367-b577f00b-13c7-46dd-92f4-68f7723257d8.png)
