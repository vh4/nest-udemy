
import { DataSource } from 'typeorm';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.HOST as any || 'mysql',
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.PORT, 10) || 3306,
        username: process.env.USERNAME || 'tony',
        password: process.env.PASSWORD || 'anakmami',
        database: process.env.DATABASE || 'nest_udemy',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
