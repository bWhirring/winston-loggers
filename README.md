### winston-loggers

基于`winston` 和 `winston-daily-rotate-file` 的log包

install

``` shell
npm i winston-loggers or yarn add winston-loggers
```

``` ts
import Logger from 'winston-loggers'

const logger = new Logger.init({
  filename: <file path>
})

logger.info('hello world')
```



### MIT
