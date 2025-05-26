import { toast } from "sonner";
import { useState } from "react";
import { executeQuery } from "@/lib/db";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { triggerDownloadFile } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_SQL_QUERY } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

import {
  FileJson,
  FileSpreadsheet,
  Play,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SqlQueryInterface() {
  const [query, setQuery] = useState(DEFAULT_SQL_QUERY);
  const [queryResult, setQueryResult] = useState<unknown[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleExecuteQuery = async () => {
    if (!query.trim()) {
      toast.error(
        <span className="flex flex-col">
          <span className="font-bold">Empty Query</span>
          <span>Please enter a SQL query to execute.</span>
        </span>
      );
      return;
    }

    setIsExecuting(true);
    setError(null);
    setQueryResult(null);

    try {
      const result = await executeQuery(query);
      console.log(result);
      if (result.rows.length > 0) {
        setColumns(result.fields.map((field) => field.name));
        setQueryResult(result.rows);
        toast.success("Query Executed", {
          description: "The query executed successfully.",
        });
      } else {
        setColumns([]);
        setQueryResult([]);
        toast.info("Query Executed", {
          description:
            "The query executed successfully but returned no results.",
        });
      }
    } catch (err) {
      console.error("Query execution error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while executing the query."
      );
      toast.error("Query Error", {
        description:
          err instanceof Error
            ? err.message
            : "An error occurred while executing the query.",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">

        <div className="flex justify-between items-center">
          <Label htmlFor="query" className="text-sm font-medium">
            Feed the Query (in SQl format)
          </Label>
        </div>

        <div className="relative bg-stone-50 rounded-md border p-4">
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="font-mono min-h-[120px] resize-y"
            placeholder="Enter your SQL query here..."
          />
        </div>

        <div className="flex w-full justify-end gap-4">
          <Button onClick={handleExecuteQuery} disabled={isExecuting} >
            <Play className="size-4" />
            {isExecuting ? "Executing..." : "Execute Query"}
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <div className="text-destructive font-mono text-sm whitespace-pre-wrap">
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {queryResult && (
        <div className="rounded-md border overflow-hidden p-4">
          <div className="flex flex-row gap-4 pb-4 justify-between">
            <Label>Query Data</Label>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  triggerDownloadFile({
                    fileType: "CSV",
                    data: queryResult,
                    columns,
                  })
                }
              >
                <FileSpreadsheet className="size-4" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  triggerDownloadFile({
                    fileType: "JSON",
                    data: queryResult,
                    columns,
                  })
                }
              >
                <FileJson className="size-4" />
                Export JSON
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {queryResult.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Query executed successfully. No results to display.
              </div>
            ) : (
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column}>{column}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queryResult.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((column) => (
                        <TableCell key={`${column}-${rowIndex}`}>
                          {String((row as Record<string, unknown>)[column])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
