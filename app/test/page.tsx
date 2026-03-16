"use client";

import React, { useEffect, useMemo, useState } from "react";
import { EvmAddressType, throwError, formatAddress } from "@trezo/evm";
import { Button } from "@/ui/button";
import { evmConfig, ConnectButton } from "@/config/evm.config";
import { Icons } from "hugeicons-proxy";

type TaskType = {
  id: bigint;
  content: string;
  isDone: boolean;
  owner: EvmAddressType;
};

type FilterType = "all" | "pending" | "completed";

export default function Page() {
  const { call } = evmConfig();

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [taskIdQuery, setTaskIdQuery] = useState<string>("");
  const [singleTask, setSingleTask] = useState<TaskType | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const [isLoading, setIsLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  const fetchAllTasks = async () => {
    setIsLoading(true);

    try {
      const list = await call.queryFn("getAllTasks", []);

      if (list.error) {
        setError(list.error.message);
        return;
      }

      setTasks(list.data as TaskType[]);
      setError(null);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Query failed";
      setError(errMsg);
      throwError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTask = async () => {
    if (!taskIdQuery) return;

    try {
      const result = await call.queryFn("getTask", [BigInt(taskIdQuery)]);

      if (result.error) {
        setError(result.error.message);
        return;
      }

      const data = result.data as unknown as [
        bigint,
        string,
        boolean,
        EvmAddressType,
      ];

      const [id, content, isDone, owner] = data;

      if (owner === "0x0000000000000000000000000000000000000000") {
        setError("Task not found or does not exist.");
        setSingleTask(null);
      } else {
        setSingleTask({
          id,
          content,
          isDone,
          owner,
        });
        setError(null);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Query failed";
      setError(errMsg);
      throwError(errMsg);
    }
  };

  const handleAddTask = async () => {
    if (!taskInput.trim()) {
      setError("Task content cannot be empty");
      return;
    }

    setTxLoading(true);

    try {
      const result = await call.mutateFn("addTask", [taskInput.trim()]);

      if (result.error) {
        setError(result.error.message);
        return;
      }

      setTaskInput("");
      setError(null);
    } catch (err) {
      console.error(err);
    } finally {
      setTxLoading(false);
    }
  };

  const toggleTask = async (task: TaskType) => {
    setTxLoading(true);

    try {
      const result = await call.mutateFn("modifyTask", [
        task.id,
        task.content,
        !task.isDone,
      ]);
      if (result.error) {
        setError(result.error.message);
        return;
      }
      setError(null);
    } catch (err) {
      console.error(err);
    } finally {
      setTxLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "pending") return !task.isDone;
      if (filter === "completed") return task.isDone;
      return true;
    });
  }, [tasks, filter]);

  useEffect(() => {
    fetchAllTasks();
    const unwatchAdd = call.listenFn("TaskAdded", () => fetchAllTasks());
    const unwatchModify = call.listenFn("TaskModified", () => fetchAllTasks());
    return () => {
      unwatchAdd();
      unwatchModify();
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Task Protocol
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              On-chain task persistence
            </p>
          </div>

          <ConnectButton>
            {({ isConnected, ensName, address, open }) => (
              <Button onClick={() => open({ view: "Account" })}>
                {isConnected
                  ? (ensName ?? formatAddress(address))
                  : "Connect Wallet"}
              </Button>
            )}
          </ConnectButton>
        </header>

        {/* Explorer */}
        <section className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase">
            <Icons.Search size={14} />
            Explorer
          </div>

          <div className="flex gap-2">
            <input
              value={taskIdQuery}
              onChange={(e) => setTaskIdQuery(e.target.value)}
              placeholder="Lookup task ID"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-600"
            />

            <button
              onClick={fetchTask}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Fetch
            </button>
          </div>

          {singleTask && (
            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{singleTask.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatAddress(singleTask.owner)}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded
                  ${
                    singleTask.isDone
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {singleTask.isDone ? "Done" : "Active"}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Add Task */}
        <section className="space-y-3">
          <div className="relative">
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter task description..."
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:border-indigo-600"
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />

            <button
              onClick={handleAddTask}
              disabled={txLoading || !taskInput.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 disabled:opacity-40"
            >
              {txLoading ? (
                <Icons.ReloadIcon className="animate-spin" size={18} />
              ) : (
                <Icons.ArrowRight02Icon size={18} />
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-xs">
              <Icons.AlertCircleIcon size={14} />
              {error}
            </div>
          )}
        </section>

        {/* Filters */}
        <section className="flex items-center justify-between">
          <div className="flex gap-5">
            {(["all", "pending", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold uppercase tracking-wide transition
                ${
                  filter === f
                    ? "text-indigo-700"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={fetchAllTasks}
            className="text-slate-500 hover:text-indigo-600"
          >
            <Icons.ReloadIcon
              size={16}
              className={isLoading ? "animate-spin" : ""}
            />
          </button>
        </section>

        {/* Tasks */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-200">
            {filteredTasks.length === 0 ? (
              <div className="py-16 text-center text-sm text-slate-500">
                No tasks found
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id.toString()}
                  onClick={() => toggleTask(task)}
                  className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        task.isDone ? "text-green-600" : "text-slate-400"
                      }`}
                    >
                      {task.isDone ? (
                        <Icons.CheckCircle size={22} />
                      ) : (
                        <Icons.CircleIcon size={22} />
                      )}
                    </div>

                    <div>
                      <p
                        className={`text-sm ${
                          task.isDone
                            ? "line-through text-slate-400"
                            : "text-slate-800 font-medium"
                        }`}
                      >
                        {task.content}
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">
                          #{task.id.toString()}
                        </span>
                        <span>{formatAddress(task.owner)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
