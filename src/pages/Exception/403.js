import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception403 = () => (
  <Exception type="403" desc="抱歉，你无权访问此页面" linkElement={Link} backText="返回首页" />
);

export default Exception403;
