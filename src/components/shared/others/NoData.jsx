import React from "react";

const NoData = ({ icon: Icon, text, subtext }) => {
  return (
    <div className="rounded-xs border border-border overflow-hidden bg-card w-full">
      <div className="px-6 py-32 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 bg-muted/50 dark:bg-muted/20 rounded-xs flex items-center justify-center text-muted-foreground">
            {Icon && <Icon size={32} />}
          </div>
          <div>
            <h3 className="text-foreground font-bold text-lg">{text}</h3>
            <p className="text-muted-foreground text-sm mt-1">{subtext}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;
