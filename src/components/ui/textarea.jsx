import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Textarea 컴포넌트
 *
 * Props:
 * @param {string} className - 추가 CSS 클래스 [Optional]
 *
 * Example usage:
 * <Textarea placeholder="메시지를 입력하세요" rows={4} />
 */
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
