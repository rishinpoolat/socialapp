--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: rishinpoolat
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "postId" integer
);


ALTER TABLE public.comments OWNER TO rishinpoolat;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: rishinpoolat
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO rishinpoolat;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rishinpoolat
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: rishinpoolat
--

CREATE TABLE public.follows (
    "createdAt" timestamp with time zone NOT NULL,
    "followingId" integer,
    "followerId" integer
);


ALTER TABLE public.follows OWNER TO rishinpoolat;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: rishinpoolat
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "postId" integer
);


ALTER TABLE public.likes OWNER TO rishinpoolat;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: rishinpoolat
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_seq OWNER TO rishinpoolat;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rishinpoolat
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: rishinpoolat
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    body text,
    media bytea,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.posts OWNER TO rishinpoolat;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: rishinpoolat
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO rishinpoolat;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rishinpoolat
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: rishinpoolat
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO rishinpoolat;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: rishinpoolat
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO rishinpoolat;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rishinpoolat
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: rishinpoolat
--

COPY public.comments (id, content, "createdAt", "updatedAt", "userId", "postId") FROM stdin;
27	dghjgjs	2023-09-18 13:36:37.782+05:30	2023-09-18 13:36:37.782+05:30	5	21
28	dghjgjs	2023-09-18 13:36:46.838+05:30	2023-09-18 13:36:46.838+05:30	5	22
31	hwhljw	2023-09-18 13:37:20.451+05:30	2023-09-18 13:37:20.451+05:30	6	22
33	hwhljw	2023-09-18 13:48:05.624+05:30	2023-09-18 13:48:05.624+05:30	11	22
34	hsmsjswhljw	2023-09-18 13:48:11.854+05:30	2023-09-18 13:48:11.854+05:30	11	22
35	hsmsjswhljw	2023-09-18 13:48:17.823+05:30	2023-09-18 13:48:17.823+05:30	9	22
38	ww	2023-09-20 16:16:59.223+05:30	2023-09-20 16:16:59.223+05:30	16	15
39	hdhdklkjdk	2023-09-20 16:17:38.73+05:30	2023-09-20 16:17:38.73+05:30	16	15
40	sbskjs	2023-09-20 17:17:22.69+05:30	2023-09-20 17:17:22.69+05:30	16	15
41	hrkjksldl	2023-09-20 17:23:47.505+05:30	2023-09-20 17:23:47.505+05:30	13	15
43	dgag	2023-09-21 14:57:43.109+05:30	2023-09-21 14:57:43.109+05:30	13	15
44	ajkhjkh	2023-09-21 15:00:17.707+05:30	2023-09-21 15:00:17.707+05:30	16	15
45	fjhdkjjks	2023-09-21 17:09:02.815+05:30	2023-09-21 17:09:02.815+05:30	13	29
46	fgf	2023-09-21 17:26:31.374+05:30	2023-09-21 17:26:31.374+05:30	13	29
47	dhjkfhdjf	2023-09-21 20:06:11.312+05:30	2023-09-21 20:06:11.312+05:30	20	15
48	smklmss	2023-09-21 21:17:07.892+05:30	2023-09-21 21:17:07.892+05:30	23	29
49	nrlr	2023-09-21 21:18:10.129+05:30	2023-09-21 21:18:10.129+05:30	23	29
50	gjjjj	2023-09-21 21:54:18.443+05:30	2023-09-21 21:54:18.443+05:30	23	29
51	hjhjjk	2023-09-21 21:55:27.994+05:30	2023-09-21 21:55:27.994+05:30	23	29
52	yjtyuiyiu	2023-09-21 21:56:00.011+05:30	2023-09-21 21:56:00.011+05:30	23	30
53	hhjg	2023-09-21 21:56:59.473+05:30	2023-09-21 21:56:59.473+05:30	23	30
54	jgjgj	2023-09-21 22:29:40.501+05:30	2023-09-21 22:29:40.501+05:30	23	29
55	hdkjhrshkfkfj	2023-09-21 22:33:03.846+05:30	2023-09-21 22:33:03.846+05:30	23	29
56	khshhdkshj	2023-09-21 22:33:48.812+05:30	2023-09-21 22:33:48.812+05:30	23	29
57	gfljdj	2023-09-21 22:34:40.345+05:30	2023-09-21 22:34:40.345+05:30	23	30
58	jgjgh	2023-09-22 08:43:40.537+05:30	2023-09-22 08:43:40.537+05:30	21	31
59	gjj	2023-09-22 09:27:45.068+05:30	2023-09-22 09:27:45.068+05:30	23	29
60	dghjdga	2023-09-22 10:10:33.898+05:30	2023-09-22 10:10:33.898+05:30	21	31
62	dyyfyy	2023-09-22 17:58:26.355+05:30	2023-09-22 17:58:26.355+05:30	25	36
63	w	2023-09-23 20:10:43.655+05:30	2023-09-23 20:10:43.655+05:30	23	31
64	dd	2023-09-23 20:11:54.012+05:30	2023-09-23 20:11:54.012+05:30	23	32
65	sss	2023-09-23 21:24:34.704+05:30	2023-09-23 21:24:34.704+05:30	23	18
66	sss	2023-09-23 21:26:20.704+05:30	2023-09-23 21:26:20.704+05:30	23	18
67	ssskkjdhkjhdjkd	2023-09-23 21:26:44+05:30	2023-09-23 21:26:44+05:30	23	18
70	sss	2023-09-23 21:28:10.139+05:30	2023-09-23 21:28:10.139+05:30	23	18
72	supeer	2023-09-23 21:58:03.501+05:30	2023-09-23 21:58:03.501+05:30	16	43
73	ss	2023-09-23 21:59:52.604+05:30	2023-09-23 21:59:52.604+05:30	16	15
74	dd	2023-09-24 18:20:17.127+05:30	2023-09-24 18:20:17.127+05:30	23	36
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: rishinpoolat
--

COPY public.follows ("createdAt", "followingId", "followerId") FROM stdin;
2023-09-18 13:21:03.041+05:30	2	1
2023-09-18 13:21:08.57+05:30	3	1
2023-09-18 13:21:11.867+05:30	4	1
2023-09-18 13:21:16.048+05:30	5	1
2023-09-18 13:21:19.342+05:30	6	1
2023-09-18 13:21:26.247+05:30	3	2
2023-09-18 13:21:29.331+05:30	4	2
2023-09-18 13:21:32.599+05:30	5	2
2023-09-18 13:21:35.866+05:30	6	2
2023-09-18 13:21:59.469+05:30	9	2
2023-09-18 13:22:03.508+05:30	12	2
2023-09-18 13:22:17.553+05:30	1	3
2023-09-18 13:22:21.098+05:30	8	3
2023-09-18 13:22:24.975+05:30	8	4
2023-09-18 13:22:29.783+05:30	11	4
2023-09-18 13:22:36.361+05:30	5	4
2023-09-18 13:22:42.364+05:30	6	4
2023-09-18 13:22:54.931+05:30	10	5
2023-09-18 13:22:59.22+05:30	11	5
2023-09-18 13:23:04.202+05:30	11	7
2023-09-19 09:37:09.421+05:30	9	13
2023-09-20 10:28:42.06+05:30	1	1
2023-09-20 10:30:55.366+05:30	7	1
2023-09-20 10:33:34.792+05:30	8	1
2023-09-20 10:33:40.437+05:30	9	1
2023-09-20 10:34:01.503+05:30	2	2
2023-09-20 11:00:32.435+05:30	10	1
2023-09-20 13:47:36.477+05:30	1	13
2023-09-20 13:48:11.942+05:30	2	13
2023-09-20 14:35:02.218+05:30	3	13
2023-09-20 14:48:01.787+05:30	4	13
2023-09-20 15:04:03.726+05:30	5	13
2023-09-20 15:05:05.287+05:30	6	13
2023-09-20 16:16:08.687+05:30	2	16
2023-09-20 17:05:57.079+05:30	4	16
2023-09-20 17:06:00.033+05:30	3	16
2023-09-20 17:23:24.503+05:30	7	13
2023-09-20 20:28:28.19+05:30	1	19
2023-09-20 20:28:29.609+05:30	2	19
2023-09-20 20:28:30.872+05:30	3	19
2023-09-20 21:22:19.168+05:30	10	13
2023-09-21 17:06:35.53+05:30	16	13
2023-09-21 20:05:36.946+05:30	2	20
2023-09-21 20:05:39.877+05:30	4	20
2023-09-21 20:26:40.71+05:30	13	21
2023-09-21 20:26:42.923+05:30	16	21
2023-09-21 20:29:39.943+05:30	1	22
2023-09-21 20:29:41.142+05:30	2	22
2023-09-21 20:29:48.178+05:30	13	22
2023-09-21 20:30:56.21+05:30	1	23
2023-09-21 20:30:58.273+05:30	20	23
2023-09-21 20:31:03.392+05:30	16	23
2023-09-22 09:27:12.584+05:30	22	23
2023-09-22 10:11:07.415+05:30	18	21
2023-09-22 10:12:26.668+05:30	23	21
2023-09-22 10:14:24.234+05:30	22	21
2023-09-22 10:14:28.682+05:30	8	21
2023-09-22 10:15:08.569+05:30	21	23
2023-09-22 17:51:31.152+05:30	3	23
2023-09-22 17:51:34.345+05:30	17	23
2023-09-22 17:57:16.173+05:30	24	25
2023-09-22 17:57:16.955+05:30	23	25
2023-09-22 17:57:17.888+05:30	22	25
2023-09-22 17:57:19.039+05:30	21	25
2023-09-22 17:57:33.072+05:30	13	25
2023-09-22 21:00:27.217+05:30	23	23
2023-09-22 21:01:09.983+05:30	13	23
2023-09-22 21:02:58.727+05:30	5	23
2023-09-23 12:15:10.927+05:30	1	11
2023-09-23 12:15:12.875+05:30	2	11
2023-09-23 12:21:11.987+05:30	24	11
2023-09-23 12:21:13.47+05:30	25	11
2023-09-23 15:10:56.111+05:30	23	11
2023-09-23 15:10:58.075+05:30	22	11
2023-09-23 19:36:53.82+05:30	4	11
2023-09-23 21:56:43.419+05:30	25	16
2023-09-23 21:56:44.266+05:30	24	16
2023-09-24 12:28:04.58+05:30	23	3
2023-09-24 12:28:05.762+05:30	22	3
2023-09-24 13:38:55.146+05:30	2	23
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: rishinpoolat
--

COPY public.likes (id, "createdAt", "userId", "postId") FROM stdin;
68	2023-09-20 19:03:13.113+05:30	13	21
69	2023-09-20 19:03:14.36+05:30	13	17
72	2023-09-20 19:03:19.211+05:30	13	18
75	2023-09-21 14:57:39.092+05:30	13	15
76	2023-09-21 14:58:16.191+05:30	13	23
77	2023-09-21 14:58:31.225+05:30	13	22
79	2023-09-21 17:08:57.581+05:30	13	29
80	2023-09-21 20:06:03.629+05:30	20	17
81	2023-09-21 20:06:06.297+05:30	20	15
84	2023-09-21 22:34:31.062+05:30	23	30
85	2023-09-22 08:43:29.709+05:30	21	34
88	2023-09-22 09:27:31.168+05:30	23	33
89	2023-09-22 10:10:25.411+05:30	21	31
90	2023-09-22 17:57:43.325+05:30	25	34
91	2023-09-22 17:58:20.073+05:30	25	36
94	2023-09-23 20:31:27.715+05:30	23	32
98	2023-09-23 22:00:00.318+05:30	16	43
34	2023-09-18 13:34:48.122+05:30	7	15
101	2023-09-24 18:02:57.186+05:30	23	37
37	2023-09-18 13:35:10.754+05:30	8	17
38	2023-09-18 13:35:14.259+05:30	8	18
39	2023-09-18 13:35:22.617+05:30	1	18
102	2023-09-24 18:12:13.083+05:30	23	39
103	2023-09-24 18:18:15.072+05:30	23	36
42	2023-09-18 13:35:40.185+05:30	2	23
43	2023-09-18 13:35:46.217+05:30	5	23
44	2023-09-18 13:35:49.786+05:30	5	22
45	2023-09-18 13:35:53.771+05:30	5	21
49	2023-09-19 09:45:54.292+05:30	9	15
60	2023-09-20 17:06:07.695+05:30	16	17
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: rishinpoolat
--

COPY public.posts (id, body, media, "createdAt", "updatedAt", "userId") FROM stdin;
15	ram	\\x696d616765	2023-09-18 13:17:43.661+05:30	2023-09-18 13:17:43.661+05:30	2
17	ramu	\\x696d616765	2023-09-18 13:17:56.169+05:30	2023-09-18 13:17:56.169+05:30	4
18	ndlkd	\\x696d616765	2023-09-18 13:18:02.635+05:30	2023-09-18 13:18:02.635+05:30	5
21	ndhfkddfklkdshkjdlkd	\\x696d616765	2023-09-18 13:18:27.934+05:30	2023-09-18 13:18:27.934+05:30	5
22	djjlsklkjlsk	\\x696d616765	2023-09-18 13:18:34.35+05:30	2023-09-18 13:18:34.35+05:30	6
23	djjljdkjdsklkjlsk	\\x696d616765	2023-09-18 13:18:38.734+05:30	2023-09-18 13:18:38.734+05:30	6
29	dnmnmdnd	\\x313639353239343733313539362d3434313138383330302e4a5047	2023-09-21 16:42:11.6+05:30	2023-09-21 16:42:11.6+05:30	16
30	hero	\\x313639353239353431343430362d3839343535393737342e706e67	2023-09-21 16:53:34.41+05:30	2023-09-21 16:53:34.41+05:30	16
31	newpost	\\x313639353239363336373532392d3234393339343434382e706e67	2023-09-21 17:09:27.531+05:30	2023-09-21 17:09:27.531+05:30	13
32	shsamal	\\x313639353239373431353139322d3939383439383938352e706e67	2023-09-21 17:26:55.194+05:30	2023-09-21 17:26:55.194+05:30	13
33	ssss	\\x313639353330363731353337342d3637393336373638362e6a706567	2023-09-21 20:01:55.38+05:30	2023-09-21 20:01:55.38+05:30	13
34	ddndn	\\x313639353330363831303232332d3234343033383635312e4a5047	2023-09-21 20:03:30.229+05:30	2023-09-21 20:03:30.229+05:30	13
36	fhgjg	\\x313639353335343238343533302d3639313539373132362e6a706567	2023-09-22 09:14:44.553+05:30	2023-09-22 09:14:44.553+05:30	23
37	kljjg	\\x313639353335343830373730362d3239343530333337312e6a706567	2023-09-22 09:23:27.723+05:30	2023-09-22 09:23:27.723+05:30	23
39	n	\\x313639353335353434393932392d3335343433343334342e6a706567	2023-09-22 09:34:09.949+05:30	2023-09-22 09:34:09.949+05:30	23
41	jhhj	\\x313639353335373832313437342d3134313132353335332e4a5047	2023-09-22 10:13:41.494+05:30	2023-09-22 10:13:41.494+05:30	21
42	ggj	\\x313639353335373833373532332d3634383837353739312e6a7067	2023-09-22 10:13:57.528+05:30	2023-09-22 10:13:57.528+05:30	21
43	fhgjg	\\x313639353338353638333235382d3736333639383133342e4a5047	2023-09-22 17:58:03.265+05:30	2023-09-22 17:58:03.265+05:30	25
44	fhgjg	\\x313639353435363436373333392d3638313939363635352e6a7067	2023-09-23 13:37:47.348+05:30	2023-09-23 13:37:47.348+05:30	11
46	dnmnmdnd	\\x313639353438363434383431312d3739393431393130322e706e67	2023-09-23 21:57:28.425+05:30	2023-09-23 21:57:28.425+05:30	16
48	new post	\\x313639353533393639373439392d3332383137323434342e706e67	2023-09-24 12:44:57.514+05:30	2023-09-24 12:44:57.514+05:30	3
50	djkjldkjs;	\\x313639353535383031343335382d3934333031383839372e706e67	2023-09-24 17:50:14.372+05:30	2023-09-24 17:50:14.372+05:30	23
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rishinpoolat
--

COPY public.users (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
1	raju	raju@gmail.com	$2b$10$QiuE4a9pYQtrPkI2BePW5eGn6S0R.iA3sgW4qPHIR/hqd8jH9I6wq	2023-09-18 08:51:13.824+05:30	2023-09-18 08:51:13.824+05:30
2	rishin	rishin@gmail.com	$2b$10$WtJnXWhH7e4wr5DXKppkkums9zXwrR80e3CekX4k2qL1HTPUY34uu	2023-09-18 08:51:27.897+05:30	2023-09-18 08:51:27.897+05:30
3	manzoor	manzoor@gmail.com	$2b$10$43V/ZFvOij8kUnyvsUY3IORebxZUTI5WXOgbMia.WuKYxObhVZbWO	2023-09-18 08:51:38.488+05:30	2023-09-18 08:51:38.488+05:30
4	babu	babu@gmail.com	$2b$10$08QNaiyPuMv5fzoLJu/owOW3IZQuTpGKplN/nbuqCRpNVPuaQMpNy	2023-09-18 08:51:48.825+05:30	2023-09-18 08:51:48.825+05:30
5	kingini	kingini@gmail.com	$2b$10$BQyQXGjq5S6jMniEY5B4Jeg7QegvxDZgcuj7XQF2vLiGXzd7ikgMO	2023-09-18 08:52:07.303+05:30	2023-09-18 08:52:07.303+05:30
6	sulaiman	sulaiman@gmail.com	$2b$10$2lKu8YbUBCC7W2/zGT7l5.xNdMKQVtYqObB5FVFGHUa7vVZ2T/NkO	2023-09-18 08:52:20.713+05:30	2023-09-18 08:52:20.713+05:30
7	kuttan	kuttan@gmail.com	$2b$10$87EklGhcjYmMmNQPuZjIru5nl6j3NcbZNvRECm7/zcZooh8aYT3au	2023-09-18 08:52:36.442+05:30	2023-09-18 08:52:36.442+05:30
8	aju	aju@gmail.com	$2b$10$1Se/tP8sMFJ4dpw7/solruR9lVXHYtzCrQ.HsTorMehLCbs7OSMlW	2023-09-18 08:52:46.255+05:30	2023-09-18 08:52:46.255+05:30
9	rakhi	rakhi@gmail.com	$2b$10$aslfDt5Y2YHWx9iNsX.NYug6huPrDRirfly92N7CrF7HUMRzn0DOS	2023-09-18 12:38:37.344+05:30	2023-09-18 12:38:37.344+05:30
10	test	test@gmail.com	$2b$10$kZEIyh5Szd8M6RIdnthgf.GcsPp9b7mK23zqkOtkSLe7KCv90zEDm	2023-09-18 12:40:35.368+05:30	2023-09-18 12:40:35.368+05:30
11	karthik	karthik@gmail.com	$2b$10$8/yShNb6ioJhIIVClPSCbuUVX0CzagjPV.Yz2A6aLtGnHAA4eX4.i	2023-09-18 12:48:44.82+05:30	2023-09-18 12:48:44.82+05:30
12	kambi	kambi@gmail.com	$2b$10$b1tFYBY7vz8Tp4V.tyvi.eaZiALgZL5QVMAcJZKjIPqGZD5P4uz7O	2023-09-18 12:55:46.633+05:30	2023-09-18 12:55:46.633+05:30
13	sabu	sabu@gmail.com	$2b$10$yOneo..iV4RPamI9BNjH2Owucb3d3AW/dcgGwtw/.9H8TaqgnJLbu	2023-09-18 13:12:43.018+05:30	2023-09-18 13:12:43.018+05:30
14	kuttanpillai	kuttanpillai@gmail.com	$2b$10$F4359xUHmn3ny/nB8BBh.ehXb9ZorbMYWUbTEssuLQEA.s0IoG3iG	2023-09-20 12:08:24.549+05:30	2023-09-20 12:08:24.549+05:30
15	kuttanpillai2	kuttanpillai2@gmail.com	$2b$10$lWoRXM1Qdm6UuGi25lltBekELb/h1CHRyn5DqV8xnOmHFcU5Ujmle	2023-09-20 12:19:38.573+05:30	2023-09-20 12:19:38.573+05:30
16	saifu	saifu@gmail.com	$2b$10$N5Fx/RjBYCDJdZGsOGIve.qHASWVTuqbA5O9Hy8WzKTZSb.WFAP/u	2023-09-20 12:22:31.004+05:30	2023-09-20 12:22:31.004+05:30
17	shahul	shahul@gmail.com	$2b$10$4ld.7ZHbGBsntJsxJk7jbOI3GLbxsaP06/41AOQmnJPV8vpEiqodK	2023-09-20 12:27:47.069+05:30	2023-09-20 12:27:47.069+05:30
18	ayyappan	ayyappan@gmail.com	$2b$10$paOMF5uPEF9XVLLZTNGL8eTCJtnZuCZPhdcqeAbAG.WH2zRvjLbX6	2023-09-20 12:28:57.17+05:30	2023-09-20 12:28:57.17+05:30
19	kari	kari@gmail.com	$2b$10$vb38qr3N0qoKXttZCZ44r.o3FozYljL23QsZEnHQixrZ1WeQq0dVy	2023-09-20 20:28:20.936+05:30	2023-09-20 20:28:20.936+05:30
20	rishin11	rishinpoolat+11@gmail.com	$2b$10$KIEYw/cZ0KkPx0KTTJXLku.SMK5qI5cAVTAbUoyKH2TLKKAatCt5u	2023-09-21 20:05:28.96+05:30	2023-09-21 20:05:28.96+05:30
21	rishin2	rishinpoolat+2@gmail.com	$2b$10$K5KVjmR.6ai4HvO0ESJ5I.XSNyJ/T1/rPNk39uc6XDtRX9wK1V6Wa	2023-09-21 20:26:26.975+05:30	2023-09-21 20:26:26.975+05:30
22	rishin3	rishinpoolat+3@gmail.com	$2b$10$ochWkywUSEJJNIQXmUuBLeWOpAL8he7EaDtRtNTkwY9YQ9WhNwCiG	2023-09-21 20:29:33.902+05:30	2023-09-21 20:29:33.902+05:30
23	rishin4	rishinpoolat+4@gmail.com	$2b$10$RA7oESZtffla.p2wyP4w0eGcP3C7x9kWuJ0QhD/D.tV2gw4uzFH0m	2023-09-21 20:30:50.794+05:30	2023-09-21 20:30:50.794+05:30
24	rishin6	rishinpoolat+6@gmail.com	$2b$10$qr6ug/qGogPgyXCQvv8BPuf/TrGOIZ01Io7HmxYFH7Hg1YkYfqmue	2023-09-22 17:32:47.505+05:30	2023-09-22 17:32:47.505+05:30
25	rishin7	rishinpoolat+7@gmail.com	$2b$10$.B4z76xw2UFtoo2n3ZgzOeQfWdb.LjUBEms3OwvcaaKAMOmbet8Fe	2023-09-22 17:57:10.146+05:30	2023-09-22 17:57:10.146+05:30
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rishinpoolat
--

SELECT pg_catalog.setval('public.comments_id_seq', 74, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rishinpoolat
--

SELECT pg_catalog.setval('public.likes_id_seq', 103, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rishinpoolat
--

SELECT pg_catalog.setval('public.posts_id_seq', 50, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rishinpoolat
--

SELECT pg_catalog.setval('public.users_id_seq', 25, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: follows_follower_id_following_id; Type: INDEX; Schema: public; Owner: rishinpoolat
--

CREATE UNIQUE INDEX follows_follower_id_following_id ON public.follows USING btree ("followerId", "followingId");


--
-- Name: likes_user_id_post_id; Type: INDEX; Schema: public; Owner: rishinpoolat
--

CREATE UNIQUE INDEX likes_user_id_post_id ON public.likes USING btree ("userId", "postId");


--
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rishinpoolat
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

