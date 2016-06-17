export interface SubFunc<T> {
  (data: T): void;
}

export interface Sub<T> {
  onNext?: SubFunc<T>;
  onError?: SubFunc<T>;
  onComplete?: SubFunc<T>;
}

export interface Subscription {
  money?: any;
  inventory?: any;
  sales?: any;
}

export interface Subscriber {
  money?: Sub<number>;
  inventory?: Sub<{ [name: string]: number }>;
  sales?: Sub<{ name: string, count: number }>;
}